<template>
  <div>
    <h1>Чат</h1>
    <div>
      <input v-model="message" @keyup.enter="sendMessage" placeholder="Введите сообщение" />
      <button @click="sendMessage">Отправить</button>
    </div>
    <ul>
      <li v-for="msg in messages" :key="msg.id">{{ msg.text }}</li>
    </ul>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'chat-message',
  data() {
    return {
      message: '',
      messages: [],
    };
  },
  mounted() {
    // Укажите адрес вашего сервера, замените 'http://localhost:3000' на ваш фактический адрес сервера
    const socket = io.connect('http://localhost:3000');

    socket.on('connect', () => {
      console.log('Подключено к серверу');
    });

    socket.on('chat message', (message) => {
      this.messages.push(message);
    });

    socket.on('disconnect', () => {
      console.log('Отключено от сервера');
    });
  },
  methods: {
    sendMessage() {
      if (this.message.trim() !== '') {
        const messageObject = {
          id: new Date().toISOString(),
          text: this.message,
        };
        this.messages.push(messageObject);

        // Отправка сообщения на сервер
        const socket = io.connect('http://localhost:3000');
        socket.emit('chat message', messageObject);

        this.message = '';
      }
    },
  },
};
</script>
