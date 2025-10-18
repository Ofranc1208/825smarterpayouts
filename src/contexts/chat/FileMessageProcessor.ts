/**
 * File Message Processor - Orchestra Pattern
 * 
 * Handles all file-related message processing including PDF analysis
 */

import { FileMessage, TextMessage } from '../../hooks/useConversationalForm';
import { MessageProcessorConfig } from './types';
import { generateUniqueId } from './utils';

export class FileMessageProcessor {
  private config: MessageProcessorConfig;

  constructor(config: MessageProcessorConfig) {
    this.config = config;
  }

  async processFileMessage(message: FileMessage): Promise<void> {
    const { setVisibleMessages, setIsTyping, setIsLoading } = this.config;

    console.log('[FileMessageProcessor] ========== PROCESSING FILE ==========');
    console.log('[FileMessageProcessor] File name:', message.content.name);
    console.log('[FileMessageProcessor] MIME type:', message.content.mime);
    console.log('[FileMessageProcessor] Full message:', message);

    if (message.content.mime === 'application/pdf') {
      console.log('[FileMessageProcessor] ✅ Routing to PDF processor');
      await this.processPDFFile(message);
    } else if (this.isImageFile(message.content.mime)) {
      console.log('[FileMessageProcessor] ✅ Routing to IMAGE processor');
      await this.processImageFile(message);
    } else {
      console.log('[FileMessageProcessor] ✅ Routing to GENERIC file processor');
      await this.processGenericFile(message);
    }
  }

  private async processPDFFile(message: FileMessage): Promise<void> {
    const { setVisibleMessages, setIsTyping, setIsLoading } = this.config;

    // Show initial confirmation
    const initialConfirmation: TextMessage = {
      id: generateUniqueId(),
      type: 'text',
      text: `✅ I've received your PDF "${message.content.name}". Let me analyze this document for you...`,
      sender: 'bot',
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setVisibleMessages(prev => [...prev, initialConfirmation]);
    }, 500);

    // Analyze PDF in the background
    setTimeout(async () => {
      try {
        await this.analyzePDF(message);
      } catch (error) {
        console.error('PDF analysis error:', error);
        await this.sendErrorMessage('I encountered an issue analyzing your document. One of our team members will review it and reach out to you shortly.');
      } finally {
        setIsTyping(false);
        setIsLoading(false);
      }
    }, 2000);
  }

  private async analyzePDF(message: FileMessage): Promise<void> {
    const { setVisibleMessages } = this.config;
    const fileContent = (message.content as any)._file;

    if (fileContent) {
      console.log('🔍 Extracting text from PDF...');

      // Import PDF text extraction utility
      const { extractPDFText } = await import('../../components/chat/SmartInputBar/utils/pdfExtractor');
      
      // Extract text from PDF
      const pdfText = await extractPDFText(fileContent);
      console.log('📄 PDF text extracted, length:', pdfText.length);

      // Check cache first
      const { generateImageCacheKey, getCachedAnalysis, cacheAnalysis } = 
        await import('../../components/chat/SmartInputBar/utils/imagePreScreener');
      
      const cacheKey = `pdf_${message.content.name}_${message.content.size}`;
      const cachedAnalysis = getCachedAnalysis(cacheKey);
      
      if (cachedAnalysis) {
        console.log('✅ [Cache] Using cached PDF analysis - NO API CALL MADE (credits saved!)');
        const analysisMessage: TextMessage = {
          id: generateUniqueId(),
          type: 'text',
          text: cachedAnalysis,
          sender: 'bot',
          createdAt: new Date().toISOString(),
        };
        setVisibleMessages(prev => [...prev, analysisMessage]);
        return;
      }

      console.log('💰 [API] No cache found - will consume API credits for PDF');

      // Send to API for analysis
      const response = await fetch('/api/openai/analyze-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pdfText: pdfText.substring(0, 4000), // Limit to first 4000 chars to save tokens
          fileName: message.content.name
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze PDF');
      }

      const data = await response.json();
      console.log('🤖 PDF analysis complete');

      // Cache the result
      cacheAnalysis(cacheKey, data.analysis);
      console.log('💾 [Cache] PDF analysis cached for future use');

      const analysisMessage: TextMessage = {
        id: generateUniqueId(),
        type: 'text',
        text: data.analysis,
        sender: 'bot',
        createdAt: new Date().toISOString(),
      };

      setVisibleMessages(prev => [...prev, analysisMessage]);
    } else {
      // Fallback if no file content available
      const analysisMessage: TextMessage = {
        id: generateUniqueId(),
        type: 'text',
        text: `I've received your document. One of our team members will review it and reach out to you shortly to assist you further.`,
        sender: 'bot',
        createdAt: new Date().toISOString(),
      };

      setVisibleMessages(prev => [...prev, analysisMessage]);
    }
  }

  private async processGenericFile(message: FileMessage): Promise<void> {
    const { setVisibleMessages, setIsTyping, setIsLoading } = this.config;

    const fileConfirmation: TextMessage = {
      id: generateUniqueId(),
      type: 'text',
      text: `✅ I've received your file "${message.content.name}". How can I help you with this document?`,
      sender: 'bot',
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setVisibleMessages(prev => [...prev, fileConfirmation]);
      setIsTyping(false);
      setIsLoading(false);
    }, 500);
  }

  private isImageFile(mimeType: string): boolean {
    const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const isImage = imageTypes.includes(mimeType) || mimeType.startsWith('image/');
    console.log('[FileMessageProcessor] isImageFile check:', { mimeType, isImage });
    return isImage;
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  private async processImageFile(message: FileMessage): Promise<void> {
    const { setVisibleMessages, setIsTyping, setIsLoading } = this.config;

    // Import pre-screening and preprocessing utilities
    const { generateImageCacheKey, getCachedAnalysis, cacheAnalysis, quickSettlementCheck } = 
      await import('../../components/chat/SmartInputBar/utils/imagePreScreener');
    const { preprocessImage, blobToBase64: preprocessBlobToBase64, getOptimalOptions } = 
      await import('../../components/chat/SmartInputBar/utils/imagePreprocessor');

    // Quick check based on filename
    const quickCheck = quickSettlementCheck(message.content.name);
    
    // Show initial confirmation with appropriate message
    const initialConfirmation: TextMessage = {
      id: generateUniqueId(),
      type: 'text',
      text: `✅ I've received your image "${message.content.name}". ${quickCheck.message}`,
      sender: 'bot',
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setVisibleMessages(prev => [...prev, initialConfirmation]);
      // Keep typing indicator on while analyzing
    }, 500);

    // Analyze image in the background
    setTimeout(async () => {
      try {
        console.log('🔍 Analyzing image document...');

        // Check cache first to avoid duplicate API calls (SAVE CREDITS!)
        const cacheKey = `${message.content.name}_${message.content.size}`;
        const cachedAnalysis = getCachedAnalysis(cacheKey);
        
        if (cachedAnalysis) {
          console.log('✅ [Cache] Using cached analysis - NO API CALL MADE (credits saved!)');
          const analysisMessage: TextMessage = {
            id: generateUniqueId(),
            type: 'text',
            text: cachedAnalysis,
            sender: 'bot',
            createdAt: new Date().toISOString(),
          };
          setVisibleMessages(prev => [...prev, analysisMessage]);
          setIsTyping(false);
          setIsLoading(false);
          return;
        }

        console.log('💰 [API] No cache found - will consume API credits');

        // Preprocess image for better OCR/Vision API performance
        let imageBase64 = null;
        if (message.content.url.startsWith('blob:')) {
          try {
            console.log('🔧 [ImagePreprocessor] Starting image optimization...');
            const response = await fetch(message.content.url);
            const originalBlob = await response.blob();
            
            // Get the original File object if available (from message content)
            const fileContent = (message.content as any)._file;
            const fileToProcess = fileContent || new File([originalBlob], message.content.name, { type: originalBlob.type });
            
            // Preprocess: resize, compress, enhance contrast
            const options = getOptimalOptions(fileToProcess);
            const optimizedBlob = await preprocessImage(fileToProcess, options);
            
            // Convert optimized image to base64
            const base64 = await preprocessBlobToBase64(optimizedBlob);
            imageBase64 = base64; // Already without prefix from preprocessor
            
            console.log('✅ [ImagePreprocessor] Image optimization complete');
          } catch (error) {
            console.warn('⚠️ [ImagePreprocessor] Preprocessing failed, using original:', error);
            // Fallback to original image if preprocessing fails
            try {
              const response = await fetch(message.content.url);
              const blob = await response.blob();
              const base64 = await this.blobToBase64(blob);
              imageBase64 = base64.split(',')[1]; // Remove data:image/jpeg;base64, prefix
            } catch (fallbackError) {
              console.error('❌ Failed to process image:', fallbackError);
            }
          }
        }

        // Use OpenAI Vision API to analyze the image
        const response = await fetch('/api/openai/analyze-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageUrl: message.content.url,
            fileName: message.content.name,
            imageBase64
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to analyze image');
        }

        const data = await response.json();
        console.log('🤖 Image analysis complete');

        // Cache the result to save credits on re-uploads
        cacheAnalysis(cacheKey, data.analysis);
        console.log('💾 [Cache] Analysis cached for future use');

        const analysisMessage: TextMessage = {
          id: generateUniqueId(),
          type: 'text',
          text: data.analysis,
          sender: 'bot',
          createdAt: new Date().toISOString(),
        };

        setVisibleMessages(prev => [...prev, analysisMessage]);
        setIsTyping(false);
        setIsLoading(false);
      } catch (error) {
        console.error('Image analysis error:', error);
        const errorMessage: TextMessage = {
          id: generateUniqueId(),
          type: 'text',
          text: `I encountered an issue analyzing your document. One of our team members will review it and reach out to you shortly.`,
          sender: 'bot',
          createdAt: new Date().toISOString(),
        };

        setVisibleMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
        setIsLoading(false);
      }
    }, 2000);
  }

  private async sendErrorMessage(text: string): Promise<void> {
    const { setVisibleMessages } = this.config;

    const errorMessage: TextMessage = {
      id: generateUniqueId(),
      type: 'text',
      text,
      sender: 'bot',
      createdAt: new Date().toISOString(),
    };

    setVisibleMessages(prev => [...prev, errorMessage]);
  }
}
