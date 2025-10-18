export function useChatWidget() {
  const loadChatWidget = () => {
    // Set configuration
    window.ChatWidgetConfig = {
      webhook: {
        url: 'https://n8n-n8n.5zv4v4.easypanel.host/webhook/101276fe-feb3-44ce-864d-da09c35de59d/chat',
        route: 'your-route-name'
      },
      branding: {
        logo: 'YOUR_LOGO_URL',
        name: 'MintEdu',
        welcomeText: 'Hi 👋, how can we help?',
        responseTimeText: 'We typically respond right away'
      },
      style: {
        primaryColor: '#10b981',
        secondaryColor: '#14b8a6',
        position: 'right',
        backgroundColor: '#ffffff',
        fontColor: '#333333'
      }
    };

    // Load script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/juansebsol/n8n-chatbot-template@latest/chat-widget.js';
    script.async = true;
    document.body.appendChild(script);
  };

  return { loadChatWidget };
}
