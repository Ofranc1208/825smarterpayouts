# 🗑️ **Files to Manually Delete - Checklist**

## ✅ **CONFIRMED: Original Files Still Contain Code**

I have verified that the original files still contain all their code and were NOT deleted:

### **1. `src/prompts/guaranteedStepPrompts.ts`**
- ✅ **CONFIRMED**: Still contains complete original code (462 lines)
- ✅ **STATUS**: Ready for manual deletion after testing
- 🎯 **NEW LOCATION**: `src/components/calculator/guaranteedstep/prompts/guaranteedStepPrompts.ts`

### **2. `src/hooks/useGuaranteedStorage.ts`**
- ✅ **CONFIRMED**: Still contains complete original code (167 lines)  
- ✅ **STATUS**: Ready for manual deletion after testing
- 🎯 **NEW LOCATION**: `src/components/calculator/guaranteedstep/hooks/useGuaranteedStorage.ts`

## 🧪 **Before Deleting - Test These Features:**

### **Guaranteed Step Functionality:**
- [ ] Open guaranteed payment calculator
- [ ] Navigate through all steps (Mode → Amount → Review → Offer)
- [ ] Test form data persistence between steps
- [ ] Test edit functionality from review step
- [ ] Verify calculations work correctly

### **Assistant Functionality:**
- [ ] Click "Ask Mint" button  
- [ ] Verify assistant panel opens
- [ ] Send a test message
- [ ] Verify contextual responses work
- [ ] Test step-specific guidance
- [ ] Test handoff to main chat

### **No Console Errors:**
- [ ] Check browser console for any errors
- [ ] Verify no TypeScript compilation errors
- [ ] Confirm all imports resolve correctly

## 🗂️ **Manual Deletion Commands:**

Once testing is complete and everything works, you can delete these files:

### **Windows Command Prompt/PowerShell:**
```bash
del "src\prompts\guaranteedStepPrompts.ts"
del "src\hooks\useGuaranteedStorage.ts"
```

### **Manual File Explorer:**
1. Navigate to `src/prompts/` and delete `guaranteedStepPrompts.ts`
2. Navigate to `src/hooks/` and delete `useGuaranteedStorage.ts`

## 🎉 **Post-Deletion Verification:**

After deletion, verify:
- [ ] Guaranteed step still works perfectly
- [ ] No import errors in console
- [ ] All functionality preserved
- [ ] Clean, self-contained architecture

## 📋 **Summary:**

- **TOTAL FILES TO DELETE**: 2
- **CURRENT STATUS**: Both files contain original code
- **SAFETY**: Code has been successfully moved to self-contained locations
- **READY**: Yes, safe to delete after testing

You now have complete control to test first, then manually delete when ready! 🎯
