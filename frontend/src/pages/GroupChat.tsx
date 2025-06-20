import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  groupId: string;
  senderId: string;
  content: string;
  createdAt: string;
}

const GroupChatPage = () => {
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const senderId = 'user123'; // 🔧 ID do usuário logado (troque quando integrar autenticação)

  // Buscar mensagens
  const fetchMessages = React.useCallback(async () => {
    if (!groupId) return;

    try {
      const response = await axios.get(`/api/messages/${groupId}`);
      setMessages(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
    }
  }, [groupId]);

  // Enviar mensagem
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post('/api/messages', {
        groupId,
        senderId,
        content: newMessage,
      });

      setMessages((prev) => [...prev, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  // Scroll para última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Atualização inicial e a cada 5 segundos
  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!groupId) return <p className="p-4">Grupo não especificado.</p>;

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto border rounded-xl shadow-md">
      <div className="p-4 border-b text-xl font-semibold">Chat do Grupo</div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {loading ? (
          <p>Carregando mensagens...</p>
        ) : (
          messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-2 rounded-lg max-w-xs ${
                msg.senderId === senderId
                  ? 'bg-blue-500 text-white self-end ml-auto'
                  : 'bg-gray-200 text-black self-start'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <p className="text-xs text-right opacity-70">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </p>
            </motion.div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
        />
        <Button onClick={handleSendMessage}>Enviar</Button>
      </div>
    </div>
  );
};

export default GroupChatPage;
