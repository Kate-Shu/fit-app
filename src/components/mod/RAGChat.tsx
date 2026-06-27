'use client';

import { createChat } from '@n8n/chat';
import { useEffect } from 'react';

const RAGChat = () => {
  useEffect(() => {
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL;
    const sessionStorageKey = 'fit-app/n8n-chat-session-id';

    if (!webhookUrl) {
      console.warn('NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL is not configured');
      return;
    }

    const existingSessionId = window.localStorage.getItem(sessionStorageKey);
    const sessionId = existingSessionId ?? crypto.randomUUID();

    if (!existingSessionId) {
      window.localStorage.setItem(sessionStorageKey, sessionId);
    }
    console.log('------sessionId: ', sessionId)
    console.log('------existingSessionId: ', existingSessionId)

    const chatApp = createChat({
      webhookUrl,
      target: '#n8n-chat',
      mode: 'window',
      showWelcomeScreen: false,
      sessionId,
      chatSessionKey: 'sessionId',
      loadPreviousSession: true,
      enableStreaming: true,
      allowFileUploads: true,
      allowedFilesMimeTypes: '',
      initialMessages: [
        'Hi! I am your Fitness coach. How can I help you today?',
      ],
      i18n: {
        en: {
          title: 'Fitness coach',
          subtitle: 'Ask about workouts, recovery, or fitness planning.',
          footer: '',
          getStarted: 'New conversation',
          inputPlaceholder: 'Ask me something about Fit App...',
          closeButtonTooltip: 'Close chat',
        },
      },
    });

    return () => {
      chatApp.unmount();
    };
  }, []);
  return <div id="n8n-chat" />;
};

export default RAGChat;
