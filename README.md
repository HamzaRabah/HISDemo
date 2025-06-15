# 🏥 HISDemo - Hospital Information System

A modern, full-stack hospital information system built with **Clean Architecture** principles, featuring comprehensive patient management capabilities.

## 🎯 **Demo Overview**

This system demonstrates a production-ready patient management solution with the following key features:

### ✨ **Core Features**
- **Patient Management**: Complete CRUD operations for patient records
- **Advanced Search**: Filter patients by name, file number, or phone number
- **Pagination**: Efficient handling of large patient datasets
- **Modal-based UI**: Intuitive add/edit forms in responsive modals
- **Real-time Updates**: Dynamic table updates without page refresh
- **Validation**: Comprehensive client and server-side validation

### 🏗️ **Architecture Highlights**
- **Clean Architecture**: Separation of concerns with clear dependencies
- **MediatR Pattern**: Command/Query separation for better maintainability
- **Lazy Loading**: Modular Angular architecture with lazy-loaded routes
- **Component Separation**: Dedicated components for different concerns

---

## 🚀 **Quick Start**

### **Prerequisites**
- .NET 9 SDK
- Node.js 18+
- PostgreSQL
- Angular CLI 18+

### **Running the Application**

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd HISDemo
   ```

2. **Setup Database**
   ```bash
   # Update connection string in appsettings.json
   # Run migrations
   dotnet ef database update
   ```

3. **Start Backend**
   ```bash
   cd src/Web
   dotnet run
   ```

4. **Start Frontend** (if running separately)
   ```bash
   cd src/Web/ClientApp
   npm install
   ng serve
   ```

5. **Access Application**
    - Frontend: `https://localhost:5001`
    - API Documentation: `https://localhost:5001/api`

---

## 🎪 **Demo Walkthrough**

### **1. Home Page**
- Professional landing page with system overview
- Technology stack showcase
- Quick navigation to patient management

### **2. Patient Management**
Navigate to `/patients` to explore:

#### **Add New Patient**
- Click **"Add Patient"** button
- Modal form with comprehensive patient fields:
    - Personal Information (Name, Citizen ID, Birthdate, Gender)
    - Contact Details (Phone, Email, Address)
    - Medical Information (File Number, First Visit Date)
    - Emergency Contact
- Form validation with real-time feedback
- Submit to create new patient record

#### **Search & Filter**
- Use the search filters component (separate from table)
- Filter by:
    - **Name**: Patient name (partial matching)
    - **File Number**: Exact medical file number
    - **Phone Number**: Contact phone number
- Pagination controls for large datasets

#### **Update Patient**
- Click edit button (pencil icon) on any patient row
- Pre-populated modal form with existing data
- Change detection highlights modified fields
- Update validation and submission

#### **Delete Patient**
- Click delete button (trash icon) on any patient row
- Confirmation modal prevents accidental deletion
- Real-time table update after deletion

### **3. API Documentation**
- Visit `/api` for interactive Swagger documentation
- Explore all endpoints with request/response examples
- Test API calls directly from browser

---

## 🛠️ **Technology Stack**

### **Backend (.NET 9)**
- **ASP.NET Core**: Web API framework
- **Entity Framework Core**: ORM with PostgreSQL
- **MediatR**: Command/Query pattern implementation
- **Clean Architecture**: Domain-driven design structure
- **Swagger/OpenAPI**: API documentation

### **Frontend (Angular 18)**
- **Angular**: Modern TypeScript framework
- **Bootstrap 5**: Responsive UI framework
- **ngx-bootstrap**: Angular Bootstrap components
- **RxJS**: Reactive programming for async operations
- **Lazy Loading**: Modular architecture with route-based code splitting

### **Database**
- **PostgreSQL**: Robust relational database
- **Code-First Migrations**: Version-controlled schema changes

---

## 📁 **Project Structure**

```
src/
├── Domain/                 # Domain entities and business rules
├── Application/            # Use cases, commands, queries (MediatR)
├── Infrastructure/         # Data access, external services
└── Web/                   # API controllers and Angular app
    ├── Endpoints/         # Minimal API endpoints
    ├── ClientApp/         # Angular application
    │   └── src/app/
    │       ├── patients/  # Patient management module
    │       │   ├── components/
    │       │   ├── services/
    │       │   └── models/
    │       └── shared/    # Shared components and utilities
    └── Infrastructure/    # Web-specific infrastructure
```

---

## 🏆 **Assessment Requirements Met**

### **✅ Backend Requirements**
- [x] **REST APIs**: POST (Add), DELETE (Remove), GET (Search) with pagination
- [x] **Clean Architecture**: Domain, Application, Infrastructure, Web layers
- [x] **MediatR**: Command/Query pattern implementation
- [x] **Entity Framework**: Code-first with PostgreSQL
- [x] **Validation**: Comprehensive data validation

### **✅ Frontend Requirements**
- [x] **Separate Components**: Patient List, Search Filters, Add, Update
- [x] **Modal Forms**: Add/Update operations in responsive modals
- [x] **Lazy Loading**: Patient module loaded on-demand
- [x] **Search Separation**: Filters component separate from table
- [x] **Real-time Updates**: No page refresh required
- [x] **Delete Confirmation**: Modal confirmation before deletion
- [x] **Angular 18**: Latest framework version

### **✅ Architecture Requirements**
- [x] **Clean Architecture**: Understanding and implementation
- [x] **MediatR Pattern**: Command/Query separation
- [x] **Modular Design**: Separation of concerns
- [x] **Best Practices**: SOLID principles, dependency injection

---

## 🎨 **Design Features**

- **Professional Healthcare Theme**: Medical blue color scheme
- **Responsive Design**: Mobile-first approach
- **Loading States**: User feedback during operations
- **Error Handling**: Graceful error display and recovery
- **Form Validation**: Real-time validation with clear messaging

---

## 🔧 **Development Notes**

### **Key Design Decisions**
1. **Clean Architecture**: Ensures testability and maintainability
2. **MediatR**: Reduces coupling between controllers and business logic
3. **Component Separation**: Each component has single responsibility
4. **Modal UI**: Better UX than full-page forms
5. **Lazy Loading**: Improved initial load performance

### **Code Quality**
- TypeScript strict mode enabled
- Consistent naming conventions
- Comprehensive error handling
- Reactive programming patterns
- Responsive design principles

---

## 📄 **License**

This project is created for assessment purposes and demonstrates modern web development practices with Clean Architecture principles.