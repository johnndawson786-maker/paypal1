// Spam Protection Utility Functions

interface SpamCheckResult {
  isSpam: boolean;
  reason?: string;
  severity: 'low' | 'medium' | 'high';
}

interface FormTimings {
  pageLoadTime: number;
  formStartTime: number;
  formSubmitTime: number;
}

// Rate Limiting
const RATE_LIMIT_KEY = 'refund_submissions';
const MAX_SUBMISSIONS_PER_HOUR = 3;
const MAX_SUBMISSIONS_PER_DAY = 5;

export const checkRateLimit = (): SpamCheckResult => {
  const now = Date.now();
  const stored = localStorage.getItem(RATE_LIMIT_KEY);
  
  if (!stored) {
    return { isSpam: false, severity: 'low' };
  }

  const submissions: number[] = JSON.parse(stored);
  const oneHourAgo = now - (60 * 60 * 1000);
  const oneDayAgo = now - (24 * 60 * 60 * 1000);

  const recentSubmissions = submissions.filter(time => time > oneHourAgo);
  const dailySubmissions = submissions.filter(time => time > oneDayAgo);

  if (recentSubmissions.length >= MAX_SUBMISSIONS_PER_HOUR) {
    return {
      isSpam: true,
      reason: 'Too many submissions in the last hour. Please wait before submitting again.',
      severity: 'high'
    };
  }

  if (dailySubmissions.length >= MAX_SUBMISSIONS_PER_DAY) {
    return {
      isSpam: true,
      reason: 'Daily submission limit reached. Please try again tomorrow.',
      severity: 'high'
    };
  }

  return { isSpam: false, severity: 'low' };
};

export const recordSubmission = (): void => {
  const now = Date.now();
  const stored = localStorage.getItem(RATE_LIMIT_KEY);
  const submissions: number[] = stored ? JSON.parse(stored) : [];
  
  submissions.push(now);
  
  // Keep only last 24 hours of submissions
  const oneDayAgo = now - (24 * 60 * 60 * 1000);
  const recentSubmissions = submissions.filter(time => time > oneDayAgo);
  
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recentSubmissions));
};

// Time-based validation
export const checkFormTiming = (timings: FormTimings): SpamCheckResult => {
  const { pageLoadTime, formStartTime, formSubmitTime } = timings;
  
  const timeOnPage = formSubmitTime - pageLoadTime;
  const timeFillingForm = formSubmitTime - formStartTime;

  // Form filled too quickly (less than 10 seconds)
  if (timeFillingForm < 10000) {
    return {
      isSpam: true,
      reason: 'Form completed too quickly. Please take your time.',
      severity: 'high'
    };
  }

  // Form filled suspiciously fast (less than 30 seconds)
  if (timeFillingForm < 30000) {
    return {
      isSpam: false,
      reason: 'Suspicious timing detected',
      severity: 'medium'
    };
  }

  // User left page immediately (less than 5 seconds on page)
  if (timeOnPage < 5000) {
    return {
      isSpam: true,
      reason: 'Invalid session detected',
      severity: 'high'
    };
  }

  return { isSpam: false, severity: 'low' };
};

// Honeypot validation
export const validateHoneypot = (honeypotValue: string): SpamCheckResult => {
  if (honeypotValue && honeypotValue.trim() !== '') {
    return {
      isSpam: true,
      reason: 'Bot detected',
      severity: 'high'
    };
  }
  return { isSpam: false, severity: 'low' };
};

// Content validation
export const checkContentSpam = (content: string): SpamCheckResult => {
  const spamKeywords = [
    'viagra', 'cialis', 'casino', 'lottery', 'winner', 'congratulations',
    'click here', 'buy now', 'limited time', 'act now', 'free money',
    'nigerian prince', 'inheritance', 'bitcoin', 'crypto investment'
  ];

  const suspiciousPatterns = [
    /http[s]?:\/\//gi, // URLs
    /\b[A-Z]{10,}\b/g, // Excessive capitals
    /(.)\1{5,}/g, // Repeated characters
    /[!]{3,}/g, // Multiple exclamation marks
    /[$£€¥]{2,}/g // Multiple currency symbols
  ];

  const lowerContent = content.toLowerCase();

  // Check for spam keywords
  for (const keyword of spamKeywords) {
    if (lowerContent.includes(keyword)) {
      return {
        isSpam: true,
        reason: 'Suspicious content detected',
        severity: 'high'
      };
    }
  }

  // Check for suspicious patterns
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(content)) {
      return {
        isSpam: false,
        reason: 'Suspicious formatting detected',
        severity: 'medium'
      };
    }
  }

  return { isSpam: false, severity: 'low' };
};

// Email validation (disposable email detection)
export const checkDisposableEmail = (email: string): SpamCheckResult => {
  const disposableDomains = [
    'tempmail.com', 'throwaway.email', '10minutemail.com', 'guerrillamail.com',
    'mailinator.com', 'maildrop.cc', 'temp-mail.org', 'fakeinbox.com',
    'trashmail.com', 'getnada.com', 'yopmail.com', 'emailondeck.com'
  ];

  const domain = email.split('@')[1]?.toLowerCase();

  if (disposableDomains.includes(domain)) {
    return {
      isSpam: true,
      reason: 'Temporary email addresses are not allowed',
      severity: 'high'
    };
  }

  return { isSpam: false, severity: 'low' };
};

// Duplicate submission check
export const checkDuplicateSubmission = (formData: any): SpamCheckResult => {
  const DUPLICATE_CHECK_KEY = 'last_submission_hash';
  const MIN_TIME_BETWEEN_SUBMISSIONS = 60000; // 1 minute

  // Create a hash of the form data
  const dataString = JSON.stringify({
    email: formData.email,
    transactionId: formData.transactionId,
    amount: formData.refundAmount
  });

  const hash = btoa(dataString); // Simple base64 encoding

  const stored = localStorage.getItem(DUPLICATE_CHECK_KEY);
  
  if (stored) {
    const { hash: lastHash, timestamp } = JSON.parse(stored);
    const timeSinceLastSubmission = Date.now() - timestamp;

    if (lastHash === hash && timeSinceLastSubmission < MIN_TIME_BETWEEN_SUBMISSIONS) {
      return {
        isSpam: true,
        reason: 'Duplicate submission detected. Please wait before resubmitting.',
        severity: 'high'
      };
    }
  }

  return { isSpam: false, severity: 'low' };
};

export const recordSubmissionHash = (formData: any): void => {
  const DUPLICATE_CHECK_KEY = 'last_submission_hash';
  
  const dataString = JSON.stringify({
    email: formData.email,
    transactionId: formData.transactionId,
    amount: formData.refundAmount
  });

  const hash = btoa(dataString);
  
  localStorage.setItem(DUPLICATE_CHECK_KEY, JSON.stringify({
    hash,
    timestamp: Date.now()
  }));
};

// Mouse movement tracking
let mouseMovements = 0;
let keyboardInputs = 0;

export const trackMouseMovement = (): void => {
  mouseMovements++;
};

export const trackKeyboardInput = (): void => {
  keyboardInputs++;
};

export const checkHumanBehavior = (): SpamCheckResult => {
  // Bots typically don't move mouse or have very few movements
  if (mouseMovements < 10 && keyboardInputs < 20) {
    return {
      isSpam: false,
      reason: 'Suspicious interaction pattern',
      severity: 'medium'
    };
  }

  if (mouseMovements === 0 && keyboardInputs === 0) {
    return {
      isSpam: true,
      reason: 'No human interaction detected',
      severity: 'high'
    };
  }

  return { isSpam: false, severity: 'low' };
};

export const resetBehaviorTracking = (): void => {
  mouseMovements = 0;
  keyboardInputs = 0;
};

// IP-based checks (simulated)
export const checkIPReputation = (): SpamCheckResult => {
  // In production, this would call an IP reputation API
  // For now, we'll just check if user is using common VPN ports
  
  const suspiciousIndicators = [
    navigator.webdriver, // Automated browser
    (window as any).phantom, // PhantomJS
    (window as any)._phantom, // PhantomJS
    (window as any).callPhantom // PhantomJS
  ];

  if (suspiciousIndicators.some(indicator => indicator)) {
    return {
      isSpam: true,
      reason: 'Automated browser detected',
      severity: 'high'
    };
  }

  return { isSpam: false, severity: 'low' };
};

// Comprehensive spam check
export const performSpamCheck = (
  formData: any,
  honeypot: string,
  timings: FormTimings
): SpamCheckResult => {
  const checks = [
    checkRateLimit(),
    validateHoneypot(honeypot),
    checkFormTiming(timings),
    checkContentSpam(formData.refundReason || ''),
    checkDisposableEmail(formData.email || ''),
    checkDuplicateSubmission(formData),
    checkHumanBehavior(),
    checkIPReputation()
  ];

  // Find highest severity spam indicator
  const spamCheck = checks.find(check => check.isSpam && check.severity === 'high');
  if (spamCheck) {
    return spamCheck;
  }

  // Count medium severity warnings
  const mediumWarnings = checks.filter(check => check.severity === 'medium');
  if (mediumWarnings.length >= 2) {
    return {
      isSpam: true,
      reason: 'Multiple suspicious indicators detected. Please contact support if you believe this is an error.',
      severity: 'medium'
    };
  }

  return { isSpam: false, severity: 'low' };
};

// Generate device fingerprint
export const generateDeviceFingerprint = (): string => {
  const fingerprint = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenResolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    cookiesEnabled: navigator.cookieEnabled,
    plugins: Array.from(navigator.plugins || []).map(p => p.name).join(',')
  };

  return btoa(JSON.stringify(fingerprint));
};

// Check if device is banned
export const checkDeviceBan = (): boolean => {
  const BANNED_DEVICES_KEY = 'banned_devices';
  const fingerprint = generateDeviceFingerprint();
  
  const banned = localStorage.getItem(BANNED_DEVICES_KEY);
  if (!banned) return false;

  const bannedDevices: string[] = JSON.parse(banned);
  return bannedDevices.includes(fingerprint);
};

// Ban device
export const banDevice = (): void => {
  const BANNED_DEVICES_KEY = 'banned_devices';
  const fingerprint = generateDeviceFingerprint();
  
  const banned = localStorage.getItem(BANNED_DEVICES_KEY);
  const bannedDevices: string[] = banned ? JSON.parse(banned) : [];
  
  if (!bannedDevices.includes(fingerprint)) {
    bannedDevices.push(fingerprint);
    localStorage.setItem(BANNED_DEVICES_KEY, JSON.stringify(bannedDevices));
  }
};
