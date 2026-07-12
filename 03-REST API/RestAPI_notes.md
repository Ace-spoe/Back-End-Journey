## REST API
- stands for **Representational State Transfer Application Programming Interface**.
- It is a set of rules that allows different software applications to communicate with each other over the internet using **HTTP**.

In simple terms: 
> A REST API is a way for a client (frontend, mobile app, or another server) to talk to a server and perform actions like **Create, Read, Update, and Delete** data.

### Core Principles of REST

1. **Stateless**: Each request from client to server must contain all the information needed. The server doesn’t remember previous requests.
2. **Client-Server**: Client and server are separate. Client handles UI, server handles data and logic.
3. **Uniform Interface**: Uses standard URLs and HTTP methods.
4. **Cacheable**: Responses can be cached to improve performance.
5. **Resource-Based**: Everything is treated as a **resource** (e.g., users, posts, products).

### Terms
- **Resource** : Any object or data.
- **Endpoint** : A specific URL for a resource.
- **Payload** : Data sent in the request body (usually JSON).