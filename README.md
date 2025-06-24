# DigitalLibrary

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Local Development Setup

This project uses local Node.js and Angular installations from `node_modules`. No global installations required.

### Prerequisites
- Node.js 18.19.1 or higher
- npm (comes with Node.js)

### Setup

**Automated Setup:**
```bash
node setup-local.js
```

**Manual Setup:**
```bash
npm install
```

## Development Commands

### Mock Backend Server
This project includes a mock backend server using json-server for API simulation.

**Start the mock backend:**
```bash
npm run mock:server
```

The mock backend will run on `http://localhost:3000` and provides:
- **API Base URL:** `http://localhost:3000/api`
- **Mock Users:** 
  - Librarian: `librarian1` (can add/edit books)
  - User: `user1` (view-only access)
- **Sample Data:** Books, users, and authentication tokens

**Available API Endpoints:**
- `POST /api/login-librarian` - Login as librarian
- `POST /api/login-user` - Login as regular user  
- `GET /api/me` - Get current user info (requires Authorization header)
- `GET /api/books` - Get all books
- `POST /api/books` - Add a book (librarian only)
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

### Development server
To start a local development server, run:
```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

**Full Development Workflow:**
1. Start the mock backend: `npm run mock:server` (runs on port 3000)
2. In another terminal, start Angular: `npm start` (runs on port 4200)
3. Angular app will be available at `http://localhost:4200`
4. Mock API will be available at `http://localhost:3000/api`

### Code scaffolding
Angular CLI includes powerful code scaffolding tools. To generate a new component, run:
```bash
npm run ng -- generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:
```bash
npm run ng -- generate --help
```

### Building
To build the project run:
```bash
npm run build
```

This will create the `dist/` directory with all the built files.

### Running unit tests
To execute unit tests run:
```bash
npm test
```

### Further help
To get more help on the Angular CLI use:
```bash
npm run ng -- help
```

Or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Mock Backend Details

### Authentication
The mock backend uses simple token-based authentication:
- **Librarian Token:** `mock-jwt-token-librarian`
- **User Token:** `mock-jwt-token-user`

### Testing the API
You can test the mock backend using the included Postman collection:
- Import `Digital-Library-Mock-Backend.postman_collection.json` into Postman
- Or use curl commands:

```bash
# Login as librarian
curl -X POST http://localhost:3000/api/login-librarian

# Get all books
curl http://localhost:3000/api/books

# Add a book (librarian only)
curl -X POST http://localhost:3000/api/books \
  -H "Authorization: Bearer mock-jwt-token-librarian" \
  -H "Content-Type: application/json" \
  -d '{"title": "New Book", "author": "Author Name", "available": true}'
```

### Database File
Mock data is stored in `db.json` and includes:
- Sample users (librarian and regular user)
- Sample books with availability status
- Authentication tokens for testing
