# Random Quote Generator using gRPC (TypeScript)

The Random Quote Generator server is built using TypeScript and gRPC. It defines a gRPC service with a single method called GetRandomQuote, which, when invoked by a client, responds with a randomly selected quote from a predefined list. The server listens for incoming requests on port 50051 by default.

## Prerequisites

Before running the Random Quote Generator server, make sure you have the following prerequisites installed:

- Node.js (14.x or later)
- npm (Node Package Manager)

## Installation

Clone this repository to your local machine:
```bash
git clone https://github.com/yourusername/random-quote-generator-grpc.git
cd random-quote-generator-grpc
```

Install the required dependencies:
```bash
npm install
```

## Usage

Compile the .proto file and generate gRPC TypeScript code:
```bash
npm run build:grpc
```

This command will generate the necessary TypeScript files from the .proto file.

**Start the server:**

```bash
npm start
```

The server will start and listen on port 50051.

**Request a random quote using a gRPC client:**

Create a client that sends a request to the server to get a random quote. You can use any gRPC client to achieve this. For a TypeScript client, you can use the following code snippet:

```typescript
import * as grpc from '@grpc/grpc-js';
import { QuoteGeneratorClient } from './generated/quote_generator_grpc_pb';
import { Empty } from './generated/quote_generator_pb';

const client = new QuoteGeneratorClient('localhost:50051', grpc.credentials.createInsecure());

client.getRandomQuote(new Empty(), (err, response) => {
  if (err) {
    console.error('Error:', err.message);
  } else {
    console.log('Random Quote:', response.getQuote());
  }
});
```

**Run the client script to get a random quote:**

```bash
npm run client
```

You should see a randomly selected quote printed on the console.

## More about?

### Example 1: Start the Server

```bash
npm start
```

This command starts the gRPC server, and it will listen on port 50051 by default.

### Example 2: Request a Random Quote - Client

```typescript
// client.ts

import * as grpc from '@grpc/grpc-js';
import { QuoteGeneratorClient } from './generated/quote_generator_grpc_pb';
import { Empty } from './generated/quote_generator_pb';

const client = new QuoteGeneratorClient('localhost:50051', grpc.credentials.createInsecure());

client.getRandomQuote(new Empty(), (err, response) => {
  if (err) {
    console.error('Error:', err.message);
  } else {
    console.log('Random Quote:', response.getQuote());
  }
});
```

To run the client:

```bash
npm run client
```

This client script will connect to the gRPC server and request a random quote. The server will respond with a randomly selected quote, and the client will print it to the console.

### Example 3: Server-side Interceptor

```typescript
// server_interceptor.ts

import * as grpc from '@grpc/grpc-js';
import { QuoteGeneratorClient } from './generated/quote_generator_grpc_pb';
import { Empty } from './generated/quote_generator_pb';

function quoteInterceptor(options: grpc.InterceptorOptions, nextHandler: grpc.InterceptorNext<QuoteGeneratorClient>): grpc.InterceptorHandle<QuoteGeneratorClient> {
  return new grpc.InterceptingCall(nextHandler(options), {
    start: (metadata, listener, next) => {
      console.log('Incoming request for a random quote.');
      next(metadata, listener);
    },
    sendMessage: (message, next) => {
      console.log('Sending quote response:', message.toObject());
      next(message);
    },
    receiveMessage: (message, next) => {
      console.log('Received quote response:', message.toObject());
      next(message);
    },
    halfClose: (next) => {
      console.log('Client closed the stream.');
      next();
    },
    cancel: (message, next) => {
      console.log('RPC canceled by the client.');
      next(message);
    },
  });
}

// Add the interceptor to the server
server.addService(QuoteGeneratorService, { getRandomQuote: quoteInterceptor });
```

## Contributing

Contributions to the Random Quote Generator project are welcome! If you have any ideas for improvements, bug fixes, or new features, feel free to submit a pull request.

## License

The Random Quote Generator project is open-source and distributed under the GPL-3.0 License.

Copyright 2023, Max Base
