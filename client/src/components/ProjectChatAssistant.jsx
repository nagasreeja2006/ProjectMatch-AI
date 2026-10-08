import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MessageSquare, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { aiService } from '../services/api';
import Button from './ui/Button';

const SUGGESTED_QUESTIONS = [
  'What should I learn first?',
  'Explain the database design.',
  'How can I improve this project?',
  'Give me testing ideas.',
];

const ProjectChatAssistant = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: `Hello! I'm your dedicated Technical Mentor for "${project.title}". Ask me about architecture, code organization, testing, or prerequisites for this specific project.`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || input;
    if (!query || !query.trim() || loading) return;

    const userMsg = { sender: 'user', text: query.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const id = project._id || project.id;
      const res = await aiService.projectAssistant(id, query.trim(), messages);
      if (res.data.success) {
        setMessages(prev => [...prev, { sender: 'assistant', text: res.data.reply }]);
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: `Regarding ${project.title}: To build this effectively, focus first on setting up your repository and data contracts with ${project.technologies.slice(0, 2).join(' & ')}.`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      {/* Header bar that toggles chat open/close */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <span>Contextual Project Assistant</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-semibold border border-blue-200 dark:border-blue-900">
                Project Specific
              </span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ask targeted questions strictly about architecting and executing {project.title}
            </p>
          </div>
        </div>

        <div className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {/* Expandable Chat Body */}
      {isOpen && (
        <div className="border-t border-slate-100 dark:border-slate-800 p-4 space-y-4">
          {/* Suggested Quick Prompts */}
          <div className="flex flex-wrap gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Log */}
          <div className="h-64 overflow-y-auto space-y-3 pr-2 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'assistant' && (
                  <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[82%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none whitespace-pre-wrap'
                  }`}
                >
                  {m.text}
                </div>
                {m.sender === 'user' && (
                  <div className="w-6 h-6 rounded-lg bg-slate-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-slate-400 italic py-1">
                <RefreshCw className="w-3 h-3 animate-spin text-blue-500" />
                Thinking in context of {project.title}...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2 pt-2"
          >
            <input
              type="text"
              placeholder={`Ask a question about ${project.title}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <Button
              type="submit"
              size="sm"
              variant="primary"
              disabled={!input.trim() || loading}
              rightIcon={<Send className="w-3.5 h-3.5" />}
            >
              Ask
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProjectChatAssistant;
