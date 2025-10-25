# Contributing to [Project Name]

Thank you for your interest in contributing! We welcome contributions from everyone. Please read through this guide to understand our contribution process and guidelines.

## 🌟 Before You Start

### ⭐ Star the Repository
**Please star this repository** before making your contribution! It helps us grow and shows your support for the project.

### 📋 Prerequisites
- Fork this repository
- Clone your forked repository to your local machine
- Create a new branch for your contribution

## 📁 Folder Structure - STRICTLY FOLLOW

**IMPORTANT:** Please follow the folder structure strictly. Non-compliant PRs will not be accepted.

```
project-root/
├── src/
│   ├── components/
│   ├── utils/
│   └── assets/
├── docs/
├── tests/
└── examples/
```

### Rules for Folder Structure:
- Place all source code in the `src/` directory
- Components go in `src/components/`
- Utility functions go in `src/utils/`
- Static assets (images, fonts, etc.) go in `src/assets/`
- Documentation files go in `docs/`
- Test files go in `tests/`
- Example code/demos go in `examples/`

**DO NOT create new top-level folders without prior discussion and approval from maintainers.**

## 🚀 How to Contribute

### 1. Find an Issue
- Check the [Issues](../../issues) page for open issues
- Look for issues labeled `good first issue` if you're new
- Comment on the issue you want to work on to get assigned

### 2. Fork and Clone
```bash
# Fork the repo via GitHub UI, then:
git clone https://github.com/YOUR-USERNAME/REPO-NAME.git
cd REPO-NAME
```

### 3. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 4. Make Your Changes
- Follow the folder structure strictly
- Write clean, readable code
- Add comments where necessary
- Update documentation if needed

### 5. Test Your Changes
- Ensure your code works as expected
- Run existing tests (if any)
- Add new tests for new features

### 6. Commit Your Changes
```bash
git add .
git commit -m "Brief description of your changes"
```

**Commit Message Guidelines:**
- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Keep it brief but descriptive
- Reference issue numbers when applicable (e.g., "Fix #123")

### 7. Push and Create PR
```bash
git push origin feature/your-feature-name
```

Then create a Pull Request from your fork to the main repository.

## 📝 Pull Request Guidelines

### Your PR should:
- ✅ Have a clear, descriptive title
- ✅ Reference the issue it addresses (e.g., "Closes #3")
- ✅ Follow the folder structure strictly
- ✅ Include a description of what changed and why
- ✅ Pass all existing tests (if applicable)
- ✅ Be based on the latest `main` branch

### PR Template
```markdown
## Description
Brief description of what this PR does

## Related Issue
Closes #[issue number]

## Changes Made
- Change 1
- Change 2
- Change 3

## Checklist
- [ ] I have starred the repository ⭐
- [ ] I have followed the folder structure strictly
- [ ] My code follows the project's style guidelines
- [ ] I have tested my changes
- [ ] I have updated documentation (if necessary)
```

## ⚠️ Important Rules

### ✅ DO:
- Follow the folder structure strictly
- Star the repository before contributing
- Write clear commit messages
- Test your changes thoroughly
- Be respectful and professional
- Ask questions if you're unsure

### ❌ DON'T:
- Create PRs without an associated issue
- Ignore the folder structure requirements
- Submit incomplete or untested code
- Make unrelated changes in a single PR
- Copy code without proper attribution

## 🏷️ Hacktoberfest Contributors

If you're contributing for Hacktoberfest:
- Ensure your PR is meaningful and adds value
- Follow all contribution guidelines
- Quality over quantity - spammy PRs will be marked as invalid
- Make sure your PR follows the folder structure

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect differing opinions and experiences

## 📞 Need Help?

- Comment on the issue you're working on
- Join our discussions
- Reach out to maintainers

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

**Thank you for contributing! Your efforts help make this project better for everyone.** 🎉

Don't forget to ⭐ star the repository if you haven't already!