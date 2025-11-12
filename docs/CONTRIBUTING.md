# VacCOVID Contributing Guide

Thank you for considering contributing to VacCOVID! This document provides guidelines and instructions for contributing to the project.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Process](#development-process)
4. [Coding Standards](#coding-standards)
5. [Making Changes](#making-changes)
6. [Pull Request Process](#pull-request-process)
7. [Testing](#testing)
8. [Documentation](#documentation)
9. [Issue Reporting](#issue-reporting)
10. [Community](#community)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. We expect all contributors to:

- **Be respectful**: Treat everyone with kindness and respect
- **Be inclusive**: Welcome different perspectives and experiences
- **Be constructive**: Focus on solutions, not criticism
- **Be transparent**: Communicate openly about issues and decisions

### Unacceptable Behavior

Unacceptable behavior includes:
- Harassment, discrimination, or bullying
- Offensive language or personal attacks
- Disrespect of differing viewpoints
- Sharing others' private information
- Other unprofessional conduct

### Reporting Issues

If you experience or witness unacceptable behavior, please:
1. Document the incident with details
2. Contact project maintainers privately
3. Describe what happened clearly
4. Suggest how to resolve it

---

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js** v14 or higher
- **npm** v6 or higher
- **Git** for version control
- **PostgreSQL** v12 or higher (for backend work)
- **Docker** (optional, for containerized development)

### Setup Development Environment

```bash
# 1. Fork the repository on GitLab
# Click "Fork" button on GitLab

# 2. Clone your fork
git clone https://gitlab.com/your-username/vaccine-now.git
cd vaccine-now

# 3. Add upstream remote
git remote add upstream https://gitlab.com/vacovid/vaccine-now.git

# 4. Install dependencies
npm install --ignore-scripts
npm install --prefix client --ignore-scripts

# 5. Setup environment variables
cp .env.example .env
# Edit .env with your settings

# 6. Start development
docker-compose up        # Or: npm start
```

---

## Development Process

### 1. Create a Feature Branch

```bash
# Update main branch
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/my-feature

# Or for bugfix
git checkout -b bugfix/my-bugfix

# Or for documentation
git checkout -b docs/my-docs
```

**Branch Naming Conventions**:
- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `docs/description` - Documentation
- `chore/description` - Build, dependencies, etc.
- `refactor/description` - Code refactoring

### 2. Make Your Changes

Follow the coding standards (see below) and make atomic commits:

```bash
# Make changes to files

# Stage changes
git add .

# Commit with clear message
git commit -m "feat: add new vaccine API endpoint"

# More commits as needed
git commit -m "test: add unit tests for vaccine endpoint"
```

**Commit Message Format**:
```
<type>: <subject>

<body>

<footer>
```

**Types**:
- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Test additions/changes
- `chore:` - Build, dependencies, etc.

**Example**:
```
feat: add vaccine efficacy filtering

Allow users to filter vaccines by reported efficacy rate.
Adds new endpoint GET /api/vaccines/efficacy/:min

Closes #123
```

### 3. Keep Branch Updated

```bash
# Fetch latest changes
git fetch upstream

# Rebase on latest main
git rebase upstream/main

# If conflicts, resolve them and continue
git rebase --continue
```

### 4. Test Your Changes

```bash
# Run all tests
npm test

# Run specific test
npm test -- vaccine.test.js

# Test with coverage
npm test -- --coverage

# Test backend
npm run server &
curl http://localhost:5000/api/npm-covid-data/world

# Test frontend
npm run client
# Visit http://localhost:3000 in browser
```

---

## Coding Standards

### TypeScript (Backend)

**File Naming**:
```
models/Country.ts
routes/vaccine.ts
utils/covidData.ts
validation/news.ts
```

**Code Style**:
```typescript
// Use async/await
export async function getVaccines() {
  const vaccines = await vaccineRepository.find();
  return vaccines;
}

// Use meaningful variable names
const totalInfectedPatients = cases + newCases;

// Add type annotations
function calculateCFR(deaths: number, cases: number): number {
  return (deaths / cases) * 100;
}

// Use const by default
const vaccine = new Vaccine();
let counter = 0;

// Add comments for complex logic
// Calculate infection risk as percentage of population
const infectionRisk = (totalCases / population) * 100;
```

**Formatting**:
```typescript
// Use 2-space indentation
// Use semicolons
// Use single quotes for strings
// Use === for comparisons
// Use arrow functions for callbacks

// Bad
if(x==5) { doSomething() }

// Good
if (x === 5) {
  doSomething();
}
```

### JavaScript/React (Frontend)

**File Naming**:
```
components/Common/Header.js
actions/covid_countries.js
reducers/vaccine.js
views/CoronavirusTracker.js
```

**Code Style**:
```javascript
// Use functional components
const MyComponent = ({ title, onClose }) => {
  const [state, setState] = useState(null);
  
  useEffect(() => {
    // Initialize
  }, []);

  return (
    <div>
      {/* JSX */}
    </div>
  );
};

// Use PropTypes for validation
MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func
};

// Use Redux for state management
const mapStateToProps = state => ({
  vaccines: state.vaccine.vaccines
});

export default connect(mapStateToProps)(MyComponent);
```

### SQL

**Query Style**:
```sql
-- Use clear formatting
SELECT 
  c.name,
  cr.total_cases,
  cr.total_deaths
FROM covid_report cr
JOIN country c ON cr.country_id = c.id
WHERE cr.date = '2020-10-31'
ORDER BY cr.total_cases DESC;

-- Use indexes for large tables
CREATE INDEX idx_covid_country_date ON covid_report(country_id, date);

-- Use proper naming conventions
-- Tables: singular (country, vaccine)
-- Columns: snake_case (total_cases)
-- Indexes: idx_table_column
```

### CSS/SCSS

```scss
// Use semantic class names
.covid-tracker-table {
  margin: 1rem 0;
  padding: 1rem;

  // Nest related styles
  &__header {
    font-weight: bold;
  }

  &__row {
    border-bottom: 1px solid #eee;

    &:hover {
      background-color: #f5f5f5;
    }
  }
}

// Use variables for consistency
$primary-color: #007bff;
$spacing-unit: 1rem;
```

---

## Making Changes

### Adding a Feature

**1. Plan Your Feature**
- Create an issue first (see Issue Reporting)
- Discuss design with maintainers
- Get approval before coding

**2. Implement Feature**
- Follow coding standards
- Add tests (see Testing)
- Update documentation (see Documentation)

**3. Example: Adding a New API Endpoint**

**Step 1**: Create route handler (`app/src/routes/newRoute.ts`)
```typescript
import { Router } from 'express';
import { getNewData } from '../utils/newData';

const router = Router();

router.get('/my-endpoint', async (req, res) => {
  try {
    const data = await getNewData();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
```

**Step 2**: Create utility function (`app/src/utils/newData.ts`)
```typescript
import { getRepository } from 'typeorm';
import { MyEntity } from '../db/models/MyEntity';

export async function getNewData() {
  const repository = getRepository(MyEntity);
  return await repository.find();
}
```

**Step 3**: Register route (`app/src/routes/index.ts`)
```typescript
import newRoute from './newRoute';

export const AppRoutes = (app: Express) => {
  app.use('/api/new-route/', newRoute);
};
```

**Step 4**: Add tests (`app/src/routes/newRoute.test.ts`)
```typescript
import request from 'supertest';
import app from '../index';

describe('New Route', () => {
  it('should return data', async () => {
    const response = await request(app)
      .get('/api/new-route/my-endpoint');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
```

**Step 5**: Update documentation
- Add endpoint to API_DOCUMENTATION.md
- Document request/response format
- Add usage examples

### Fixing a Bug

**1. Report or Select Issue**
- Create issue with details
- Or select existing issue to fix

**2. Reproduce Bug**
```bash
# Write test that fails
npm test -- myBug.test.js
# Test should fail, confirming bug exists
```

**3. Fix Bug**
- Make minimal changes
- Only fix the reported bug
- Don't refactor related code

**4. Verify Fix**
```bash
# Test should now pass
npm test -- myBug.test.js

# Manual testing
npm start
# Test in browser/curl
```

---

## Pull Request Process

### Before Submitting

```bash
# 1. Update branch with latest changes
git fetch upstream
git rebase upstream/main

# 2. Run all tests
npm test

# 3. Check code style
npm run lint  # If configured

# 4. Build successfully
npm run build

# 5. Test deployment locally
docker-compose up
```

### Submitting PR

**1. Push Your Branch**
```bash
git push origin feature/my-feature
```

**2. Create Pull Request**
- Go to GitLab repository
- Click "New merge request"
- Select your branch
- Fill in description (see template below)
- Request reviewers
- Submit

**PR Description Template**:
```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation

## Related Issue
Fixes #123

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing Done
- [ ] Unit tests added
- [ ] Integration tests passed
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Added appropriate tests
- [ ] All tests passing
```

### Code Review

During code review, maintainers will:
- Check code quality and standards
- Verify tests are adequate
- Ensure documentation is complete
- Discuss design decisions

**You may be asked to**:
- Add more tests
- Update documentation
- Refactor code for clarity
- Fix coding standard violations

**Address feedback**:
```bash
# Make requested changes
# Commit changes
git commit -m "address review feedback"

# Push updated branch (auto-updates PR)
git push origin feature/my-feature
```

### Merging

Once approved:
- Maintainer will merge your PR
- Your changes go to main branch
- Deployed in next release

---

## Testing

### Writing Tests

**Frontend Test** (`client/src/components/MyComponent.test.js`):
```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders component', () => {
    render(<MyComponent />);
    expect(screen.getByText(/expected text/i)).toBeInTheDocument();
  });

  it('handles click', async () => {
    render(<MyComponent />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(screen.getByText(/after click/i)).toBeInTheDocument();
  });
});
```

**Backend Test** (`app/src/routes/vaccine.test.ts`):
```typescript
import request from 'supertest';
import app from '../index';

describe('Vaccine Routes', () => {
  it('GET /api/vaccines/get-all-vaccines', async () => {
    const response = await request(app)
      .get('/api/vaccines/get-all-vaccines');
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
```

### Running Tests

```bash
# All tests
npm test

# Specific file
npm test MyComponent

# With coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

---

## Documentation

### Update Documentation When

- ✅ Adding new feature
- ✅ Changing API endpoint
- ✅ Modifying database schema
- ✅ Updating deployment process
- ✅ Fixing confusing code

### Where to Document

- **API Changes**: `docs/API_DOCUMENTATION.md`
- **Code Structure**: `docs/DEVELOPMENT_GUIDE.md`
- **Database**: `docs/DATABASE_SCHEMA.md`
- **Deployment**: `docs/DEPLOYMENT.md`
- **Architecture**: `docs/ARCHITECTURE.md`

### Documentation Standard

```markdown
# Section Title

Brief introduction about this section.

## Subsection

Detailed explanation with examples.

### Code Example

\`\`\`typescript
// Code here
\`\`\`

### Related Info

Link to related sections or files.
```

---

## Issue Reporting

### Before Creating Issue

1. **Search existing issues** - Your issue may already be reported
2. **Check documentation** - Answer might be in docs
3. **Try troubleshooting** - See TROUBLESHOOTING.md

### Creating an Issue

**Use the issue template**:

```markdown
## Description
Clear description of the issue

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Environment
- OS: macOS/Linux/Windows
- Node.js: v14.x
- npm: v6.x
- Docker: version

## Additional Context
Screenshots, logs, or other info
```

### Issue Types

- **Bug Report**: Something isn't working correctly
- **Feature Request**: Suggest a new feature
- **Documentation**: Improve or add documentation
- **Question**: Ask for help or clarification

---

## Community

### Getting Help

- **Issues**: Ask questions in issue tracker
- **Documentation**: Check docs first
- **Community**: Discuss in project forums/chat

### Staying Updated

- Watch the repository for updates
- Star if you like the project
- Share with others interested in similar projects

### Recognition

Contributors will be:
- Added to CONTRIBUTORS file
- Credited in release notes
- Thanked in documentation

---

## Resources

### Project Documentation
- [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

### External Resources
- [Node.js Documentation](https://nodejs.org)
- [React Documentation](https://reactjs.org)
- [Express.js Guide](https://expressjs.com)
- [PostgreSQL Manual](https://www.postgresql.org/docs)
- [Git Tutorial](https://git-scm.com/doc)
- [GitLab Docs](https://docs.gitlab.com)

---

## Questions?

If you have questions not answered in this guide:

1. Check the documentation
2. Search existing issues
3. Create a new issue with your question
4. Ask in the community chat/forum

---

## License

By contributing to VacCOVID, you agree that your contributions will be licensed under the same license as the project (see LICENSE file).

---

Thank you for contributing to VacCOVID! 🎉

*Last Updated: November 2025*
