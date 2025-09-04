import amql from 'amqplib';

let channel: amql.Channel;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amql.connect({
      protocol: 'amqp',
      hostname: process.env.Rabbitmq_Host,
      username: process.env.Rabbitmq_Username,
      password: process.env.Rabbitmq_Password,
    });

    channel = await connection.createChannel();
    console.log('✅ connected to rabbitmq');
  } catch (error) {
    console.log('Failaed to connect to rabbitmq. ');
  }
};

export const publishToQueue = async (queueName: string, message: any) => {
  if (!channel) {
    console.log('Rabbitmq channel is not initialised. ');
    return;
  }
  await channel.assertQueue(queueName, { durable: true });
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });
};
