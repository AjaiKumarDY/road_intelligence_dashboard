import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const CommunicationCenter = () => {
  const [activeChannel, setActiveChannel] = useState('dispatch');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const channels = [
    { id: 'dispatch', name: 'Dispatch', icon: 'Radio', active: true },
    { id: 'police', name: 'Police', icon: 'Shield', active: true },
    { id: 'fire', name: 'Fire Dept', icon: 'Flame', active: true },
    { id: 'medical', name: 'Medical', icon: 'Heart', active: false },
    { id: 'maintenance', name: 'Maintenance', icon: 'Wrench', active: true }
  ];

  const initialMessages = [
    {
      id: 1,
      channel: 'dispatch',
      sender: 'DISPATCH-01',
      message: 'All units, we have a multi-vehicle accident at Times Square. Police and Fire units respond.',
      timestamp: new Date(Date.now() - 300000),
      priority: 'high',
      type: 'broadcast'
    },
    {
      id: 2,
      channel: 'police',
      sender: 'POLICE-01',
      message: 'Unit POLICE-01 responding to Times Square incident, ETA 3 minutes.',
      timestamp: new Date(Date.now() - 240000),
      priority: 'normal',
      type: 'response'
    },
    {
      id: 3,
      channel: 'fire',
      sender: 'FIRE-03',
      message: 'Engine 03 en route to Times Square, requesting traffic control for approach.',
      timestamp: new Date(Date.now() - 180000),
      priority: 'normal',
      type: 'request'
    },
    {
      id: 4,
      channel: 'dispatch',
      sender: 'DISPATCH-01',
      message: 'Traffic control activated for Times Square area. Diverting traffic via alternate routes.',
      timestamp: new Date(Date.now() - 120000),
      priority: 'normal',
      type: 'update'
    },
    {
      id: 5,
      channel: 'police',
      sender: 'POLICE-01',
      message: 'On scene at Times Square. Two vehicles involved, requesting tow trucks and medical assistance.',
      timestamp: new Date(Date.now() - 60000),
      priority: 'high',
      type: 'report'
    }
  ];

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  const getChannelIcon = (channelId) => {
    const channel = channels?.find(c => c?.id === channelId);
    return channel?.icon || 'Radio';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'normal': return 'text-foreground';
      case 'low': return 'text-muted-foreground';
      default: return 'text-foreground';
    }
  };

  const getMessageTypeIcon = (type) => {
    switch (type) {
      case 'broadcast': return 'Megaphone';
      case 'response': return 'MessageSquare';
      case 'request': return 'HelpCircle';
      case 'update': return 'Info';
      case 'report': return 'FileText';
      default: return 'MessageSquare';
    }
  };

  const filteredMessages = messages?.filter(msg => msg?.channel === activeChannel);

  const handleSendMessage = () => {
    if (newMessage?.trim()) {
      const message = {
        id: messages?.length + 1,
        channel: activeChannel,
        sender: 'OPERATOR-01',
        message: newMessage,
        timestamp: new Date(),
        priority: 'normal',
        type: 'broadcast'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const formatTime = (timestamp) => {
    return timestamp?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (timestamp) => {
    const diff = Date.now() - timestamp?.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 min ago';
    return `${minutes} min ago`;
  };

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Communication Center
        </h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors duration-200">
            <Icon name="Settings" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      {/* Channel Tabs */}
      <div className="flex border-b border-border overflow-x-auto">
        {channels?.map((channel) => (
          <button
            key={channel?.id}
            onClick={() => setActiveChannel(channel?.id)}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
              activeChannel === channel?.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={channel?.icon} size={16} />
            <span>{channel?.name}</span>
            {channel?.active && (
              <div className="w-2 h-2 bg-success rounded-full"></div>
            )}
          </button>
        ))}
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredMessages?.map((message) => (
          <div key={message?.id} className="flex items-start space-x-3 p-3 bg-surface rounded-lg">
            <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-full">
              <Icon name={getChannelIcon(message?.channel)} size={16} className="text-muted-foreground" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">{message?.sender}</span>
                  <Icon 
                    name={getMessageTypeIcon(message?.type)} 
                    size={12} 
                    className="text-muted-foreground" 
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">{formatTime(message?.timestamp)}</span>
                  <span className="text-xs text-muted-foreground">({getTimeAgo(message?.timestamp)})</span>
                </div>
              </div>
              
              <p className={`text-sm ${getPriorityColor(message?.priority)}`}>
                {message?.message}
              </p>
              
              {message?.priority === 'high' && (
                <div className="flex items-center space-x-1 mt-2">
                  <Icon name="AlertTriangle" size={12} className="text-error" />
                  <span className="text-xs text-error font-medium">HIGH PRIORITY</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Message Input */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Icon name={getChannelIcon(activeChannel)} size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {channels?.find(c => c?.id === activeChannel)?.name}
            </span>
          </div>
          
          <div className="flex-1 flex items-center space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e?.target?.value)}
              onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            
            <select className="px-2 py-2 bg-surface border border-border rounded-md text-sm text-foreground">
              <option value="normal">Normal</option>
              <option value="high">High Priority</option>
              <option value="low">Low Priority</option>
            </select>
            
            <button
              onClick={handleSendMessage}
              disabled={!newMessage?.trim()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Icon name="Send" size={16} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>Press Enter to send</span>
          <span>{filteredMessages?.length} messages in {channels?.find(c => c?.id === activeChannel)?.name}</span>
        </div>
      </div>
    </div>
  );
};

export default CommunicationCenter;