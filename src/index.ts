interface Greeting {
  name: string;
  timestamp: Date;
}

function greet({ name, timestamp }: Greeting): string {
  return `Hello, ${name}! It is ${timestamp.toISOString()}`;
}

console.log(greet({ name: "HybridAI-Trading", timestamp: new Date() }));
