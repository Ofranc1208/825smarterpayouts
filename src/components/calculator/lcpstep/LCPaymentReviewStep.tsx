"use client";

import React, { useState } from 'react';
import LCPStepContainer from './LCPStepContainer';
import { 
  LCPPaymentData, 
  LCPDetailsData, 
  LCPProfileData, 
  LCPLifestyleData, 
  LCPHealthData,
  LCPCalculationResult 
} from '../../../types';

interface Props {
  paymentData: LCPPaymentData;
  detailsData: LCPDetailsData;
  profileData: LCPProfileData;
  lifestyleData: LCPLifestyleData;
  healthData: LCPHealthData;
  lumpSumPayments?: Array<{ amount: string; lumpSumDate: string }>;
  onEdit?: (step: number) => void;
  onCalculate: () => void;
  result?: LCPCalculationResult;
  error?: string;
  currentStep: number;
  totalSteps: number;
}

// Helper to format dates for display
function formatDate(dateStr: string) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

const LCPaymentReviewStep: React.FC<Props> = ({
  paymentData,
  detailsData,
  profileData,
  lifestyleData,
  healthData,
  lumpSumPayments,
  onEdit,
  onCalculate,
  result,
  error,
  currentStep,
  totalSteps,
}) => {
  // Use props directly since LCP is now self-contained
  const currentPaymentData = paymentData;
  const currentDetailsData = detailsData;
  const currentProfileData = profileData;
  const currentLifestyleData = lifestyleData;
  const currentHealthData = healthData;

  const [showDetails, setShowDetails] = useState(false);

  return (
    <LCPStepContainer title="Review & Calculate" currentStep={currentStep} totalSteps={totalSteps}>
      <div style={{
        width: '100%',
        background: '#fff',
        borderRadius: '16px',
        boxShadow: 'none',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.1rem',
          marginBottom: '1.2rem'
        }}>
          
          {/* Edit Form Button */}
          {onEdit && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <button 
                onClick={() => onEdit(1)}
                type="button"
                style={{
                  background: '#22c55e',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  padding: '0.2rem 0.7rem',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#16a34a';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#22c55e';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                ✏️ Edit Form
              </button>
            </div>
          )}
          
          {/* Payment Section */}
          <div style={{
            background: '#f9fafb',
            borderRadius: '12px',
            padding: '0.7rem 1rem 0.5rem 1rem',
            boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.3rem'
            }}>
              <span style={{
                fontSize: '0.93rem',
                fontWeight: '700',
                color: '#222'
              }}>Payment</span>
            </div>
            <ul style={{
              listStyle: 'none',
              padding: '0',
              margin: '0',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.2rem'
            }}>
              <li style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.93rem',
                padding: '0.1rem 0'
              }}>
                <span style={{
                  color: '#666',
                  fontWeight: '500',
                  marginRight: '0.5rem'
                }}>Payment Mode:</span>
                <span style={{
                  color: '#222',
                  fontWeight: '600'
                }}>{currentPaymentData?.paymentMode || 'Not specified'}</span>
              </li>
              
              {/* Handle Lump Sum payments differently */}
              {currentPaymentData?.paymentMode === 'Lump Sum' ? (
                <>
                  <li style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.93rem',
                    padding: '0.1rem 0'
                  }}>
                    <span style={{
                      color: '#666',
                      fontWeight: '500',
                      marginRight: '0.5rem'
                    }}>Number of Payments:</span>
                    <span style={{
                      color: '#222',
                      fontWeight: '600'
                    }}>
                      {lumpSumPayments?.length || 0}
                    </span>
                  </li>
                  <li style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.93rem',
                    padding: '0.1rem 0'
                  }}>
                    <span style={{
                      color: '#666',
                      fontWeight: '500',
                      marginRight: '0.5rem'
                    }}>Total Amount:</span>
                    <span style={{
                      color: '#222',
                      fontWeight: '600'
                    }}>
                      ${lumpSumPayments?.reduce((sum: number, payment: any) => 
                        sum + (Number(payment.amount) || 0), 0).toLocaleString() || 'Not specified'}
                    </span>
                  </li>
                  <li style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.93rem',
                    padding: '0.1rem 0'
                  }}>
                    <span style={{
                      color: '#666',
                      fontWeight: '500',
                      marginRight: '0.5rem'
                    }}>Annual Increase:</span>
                    <span style={{
                      color: '#222',
                      fontWeight: '600'
                    }}>{currentDetailsData?.annualIncrease !== undefined ? `${currentDetailsData.annualIncrease}%` : 'Not specified'}</span>
                  </li>
                  {/* Show individual payments */}
                  {lumpSumPayments?.map((payment: any, index: number) => (
                    <li key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.93rem',
                      padding: '0.1rem 0'
                    }}>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.2rem',
                        padding: '0.3rem 0',
                        borderTop: '1px solid #f0f0f0',
                        marginTop: '0.3rem'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontSize: '0.85rem'
                        }}>
                          <span style={{
                            color: '#666',
                            fontWeight: '500',
                            marginRight: '0.5rem'
                          }}>Payment {index + 1}:</span>
                          <span style={{
                            color: '#222',
                            fontWeight: '600'
                          }}>${Number(payment.amount).toLocaleString()}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontSize: '0.85rem'
                        }}>
                          <span style={{
                            color: '#666',
                            fontWeight: '500',
                            marginRight: '0.5rem'
                          }}>Date:</span>
                          <span style={{
                            color: '#222',
                            fontWeight: '600'
                          }}>{formatDate(payment.lumpSumDate)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  <li style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.93rem',
                    padding: '0.1rem 0'
                  }}>
                    <span style={{
                      color: '#666',
                      fontWeight: '500',
                      marginRight: '0.5rem'
                    }}>Amount:</span>
                    <span style={{
                      color: '#222',
                      fontWeight: '600'
                    }}>${currentPaymentData?.amount ? Number(currentPaymentData.amount).toLocaleString() : 'Not specified'}</span>
                  </li>
                  <li style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.93rem',
                    padding: '0.1rem 0'
                  }}>
                    <span style={{
                      color: '#666',
                      fontWeight: '500',
                      marginRight: '0.5rem'
                    }}>Annual Increase:</span>
                    <span style={{
                      color: '#222',
                      fontWeight: '600'
                    }}>{currentDetailsData?.annualIncrease !== undefined ? `${currentDetailsData.annualIncrease}%` : 'Not specified'}</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Details Section - Only show for non-lump sum payments */}
          {currentPaymentData?.paymentMode !== 'Lump Sum' && (
            <div style={{
              background: '#f9fafb',
              borderRadius: '12px',
              padding: '0.7rem 1rem 0.5rem 1rem',
              boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.3rem'
              }}>
                <span style={{
                  fontSize: '0.93rem',
                  fontWeight: '700',
                  color: '#222'
                }}>Details</span>
              </div>
              <ul style={{
                listStyle: 'none',
                padding: '0',
                margin: '0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.2rem'
              }}>
                <li style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.93rem',
                  padding: '0.1rem 0'
                }}>
                  <span style={{
                    color: '#666',
                    fontWeight: '500',
                    marginRight: '0.5rem'
                  }}>Start Date:</span>
                  <span style={{
                    color: '#222',
                    fontWeight: '600'
                  }}>{currentDetailsData?.startDate ? formatDate(currentDetailsData.startDate) : 'Not specified'}</span>
                </li>
                <li style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.93rem',
                  padding: '0.1rem 0'
                }}>
                  <span style={{
                    color: '#666',
                    fontWeight: '500',
                    marginRight: '0.5rem'
                  }}>End Date:</span>
                  <span style={{
                    color: '#222',
                    fontWeight: '600'
                  }}>{currentDetailsData?.endDate ? formatDate(currentDetailsData.endDate) : 'Not specified'}</span>
                </li>
              </ul>
            </div>
          )}

          {/* Profile Section */}
          <div style={{
            background: '#f9fafb',
            borderRadius: '12px',
            padding: '0.7rem 1rem 0.5rem 1rem',
            boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.3rem'
            }}>
              <span style={{
                fontSize: '0.93rem',
                fontWeight: '700',
                color: '#222'
              }}>Profile</span>
            </div>
            <ul style={{
              listStyle: 'none',
              padding: '0',
              margin: '0',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.2rem'
            }}>
              {Object.entries(currentProfileData || {}).map(([key, value]) => (
                <li key={key} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.93rem',
                  padding: '0.1rem 0'
                }}>
                  <span style={{
                    color: '#666',
                    fontWeight: '500',
                    marginRight: '0.5rem'
                  }}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                  <span style={{
                    color: '#222',
                    fontWeight: '600'
                  }}>{String(value)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lifestyle Section */}
          <div style={{
            background: '#f9fafb',
            borderRadius: '12px',
            padding: '0.7rem 1rem 0.5rem 1rem',
            boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.3rem'
            }}>
              <span style={{
                fontSize: '0.93rem',
                fontWeight: '700',
                color: '#222'
              }}>Lifestyle</span>
            </div>
            <ul style={{
              listStyle: 'none',
              padding: '0',
              margin: '0',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.2rem'
            }}>
              {/* Weight */}
              {currentLifestyleData?.weight && (
                <li style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.93rem',
                  padding: '0.1rem 0'
                }}>
                  <span style={{
                    color: '#666',
                    fontWeight: '500',
                    marginRight: '0.5rem'
                  }}>Weight:</span>
                  <span style={{
                    color: '#222',
                    fontWeight: '600'
                  }}>{currentLifestyleData.weight}</span>
                </li>
              )}
              
              {/* Body Frame (moved from Profile to Lifestyle) */}
              {currentProfileData?.bodyFrame && (
                <li style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.93rem',
                  padding: '0.1rem 0'
                }}>
                  <span style={{
                    color: '#666',
                    fontWeight: '500',
                    marginRight: '0.5rem'
                  }}>Body Frame:</span>
                  <span style={{
                    color: '#222',
                    fontWeight: '600'
                  }}>{currentProfileData.bodyFrame}</span>
                </li>
              )}
              
              {/* Smoking Status (moved from Health to Lifestyle) */}
              {currentHealthData?.smoke && (
                <li style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.93rem',
                  padding: '0.1rem 0'
                }}>
                  <span style={{
                    color: '#666',
                    fontWeight: '500',
                    marginRight: '0.5rem'
                  }}>Smoking Status:</span>
                  <span style={{
                    color: '#222',
                    fontWeight: '600'
                  }}>{currentHealthData.smoke}</span>
                </li>
              )}
              
              {/* Health Profile (moved from Health to Lifestyle) */}
              {currentHealthData?.health && (
                <li style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.93rem',
                  padding: '0.1rem 0'
                }}>
                  <span style={{
                    color: '#666',
                    fontWeight: '500',
                    marginRight: '0.5rem'
                  }}>Health Profile:</span>
                  <span style={{
                    color: '#222',
                    fontWeight: '600'
                  }}>{currentHealthData.health}</span>
                </li>
              )}
              
              {/* Cardiac Health (moved from Health to Lifestyle) */}
              {currentHealthData?.cardiac && (
                <li style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.93rem',
                  padding: '0.1rem 0'
                }}>
                  <span style={{
                    color: '#666',
                    fontWeight: '500',
                    marginRight: '0.5rem'
                  }}>Cardiac Health:</span>
                  <span style={{
                    color: '#222',
                    fontWeight: '600'
                  }}>{currentHealthData.cardiac}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Health Section */}
          <div style={{
            background: '#f9fafb',
            borderRadius: '12px',
            padding: '0.7rem 1rem 0.5rem 1rem',
            boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.3rem'
            }}>
              <span style={{
                fontSize: '0.93rem',
                fontWeight: '700',
                color: '#222'
              }}>Health</span>
            </div>
            <ul style={{
              listStyle: 'none',
              padding: '0',
              margin: '0',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.2rem'
            }}>
              {Object.entries(currentHealthData || {}).map(([key, value]) => (
                <li key={key} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.93rem',
                  padding: '0.1rem 0'
                }}>
                  <span style={{
                    color: '#666',
                    fontWeight: '500',
                    marginRight: '0.5rem'
                  }}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                  <span style={{
                    color: '#222',
                    fontWeight: '600'
                  }}>{String(value)}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
        <button 
          style={{
            background: '#22c55e',
            color: '#fff',
            border: 'none',
            borderRadius: '999px',
            fontSize: '1.05rem',
            fontWeight: '700',
            padding: '0.7rem 2.2rem',
            margin: '1.1rem auto 0 auto',
            display: 'block',
            cursor: 'pointer',
            transition: 'background 0.15s',
            boxShadow: '0 1px 4px rgba(34,197,94,0.08)'
          }}
          onClick={onCalculate} 
          type="button"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#16a34a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#22c55e';
          }}
        >Calculate</button>
        {result && (
          <div style={{
            width: '100%',
            marginTop: '1.2rem',
            padding: '1rem',
            background: '#f9fafb',
            borderRadius: '12px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '0.7rem',
              color: '#222'
            }}>Result</h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '1.1rem',
                fontWeight: '700',
                padding: '0.3rem 0',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <span style={{
                  color: '#666',
                  fontWeight: '600'
                }}>Payout Amount:</span> 
                <span style={{
                  color: '#22c55e',
                  fontWeight: '700'
                }}>${result.npv?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              {result.minPayout !== undefined && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    color: '#666',
                    fontWeight: '600'
                  }}>Min Payout:</span> 
                  <span style={{
                    color: '#222',
                    fontWeight: '600'
                  }}>${result.minPayout?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
              )}
              {result.maxPayout !== undefined && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    color: '#666',
                    fontWeight: '600'
                  }}>Max Payout:</span> 
                  <span style={{
                    color: '#222',
                    fontWeight: '600'
                  }}>${result.maxPayout?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
              )}
              {result.familyProtectionNPV !== undefined && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    color: '#666',
                    fontWeight: '600'
                  }}>Family Protection Value:</span> 
                  <span style={{
                    color: '#222',
                    fontWeight: '600'
                  }}>${result.familyProtectionNPV?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
              )}
            </div>
            <button
              style={{
                background: '#e5e7eb',
                color: '#666',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.85rem',
                padding: '0.4rem 1rem',
                marginTop: '0.7rem',
                cursor: 'pointer',
                transition: 'background 0.15s',
                fontWeight: '500',
                display: 'block',
                width: '100%'
              }}
              type="button"
              onClick={() => setShowDetails((v) => !v)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#d1d5db';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#e5e7eb';
              }}
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
            {showDetails && (
              <pre style={{
                marginTop: '0.7rem',
                padding: '0.7rem',
                background: '#fff',
                borderRadius: '8px',
                fontSize: '0.8rem',
                color: '#666',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                border: '1px solid #e5e7eb'
              }}>{JSON.stringify(result, null, 2)}</pre>
            )}
          </div>
        )}
        {error && (
          <div style={{
            color: '#ef4444',
            fontSize: '0.93rem',
            marginTop: '0.7rem',
            textAlign: 'center',
            padding: '0.7rem',
            background: '#fef2f2',
            borderRadius: '8px',
            border: '1px solid #fecaca'
          }}>{error}</div>
        )}
      </div>
    </LCPStepContainer>
  );
};

export default LCPaymentReviewStep; 