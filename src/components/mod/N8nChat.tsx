'use client';

import { createChat } from '@n8n/chat';
import { useEffect } from 'react';

const N8nChat = () => {
  useEffect(() => {
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn('NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL is not configured');
      return;
    }

    const chatApp = createChat({
      webhookUrl,
      target: '#n8n-chat',
      mode: 'window',
      showWelcomeScreen: false,
      loadPreviousSession: false,
      enableStreaming: true,
      initialMessages: [
        'Hi! I am your Fit App Chat-bot. How can I help you today?',
      ],
      i18n: {
        en: {
          title: 'Fit App Chat-bot',
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

export default N8nChat;
