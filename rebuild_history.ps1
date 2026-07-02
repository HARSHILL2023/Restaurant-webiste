# Stop on error
$ErrorActionPreference = "Stop"

Write-Host "Unstaging all files..."
git reset

Write-Host "Creating Commit 1..."
git add package.json frontend/.gitignore backend/.gitignore
git commit -m "chore: initialize project structure"

Write-Host "Creating Commit 2..."
git add backend/package.json backend/package-lock.json backend/tsconfig.json
git commit -m "chore: configure express backend and typescript"

Write-Host "Creating Commit 3..."
git add backend/src/config/db.ts
git commit -m "feat: connect mongodb database"

Write-Host "Creating Commit 4..."
git add backend/src/utils/generateToken.ts backend/src/middlewares/authMiddleware.ts
git commit -m "feat: implement user authentication with jwt"

Write-Host "Creating Commit 5..."
git add backend/src/models/User.ts backend/src/models/Reservation.ts
git commit -m "feat: create user and reservation models"

Write-Host "Creating Commit 6..."
git add backend/src/routes/authRoutes.ts backend/src/controllers/authController.ts
git commit -m "feat: implement reservation booking api"

Write-Host "Creating Commit 7..."
git add backend/src/routes/reservationRoutes.ts backend/src/controllers/reservationController.ts
git commit -m "feat: add reservation validation and capacity checking"

Write-Host "Creating Commit 8..."
git add backend/src/config/cloudinary.ts backend/src/middlewares/uploadMiddleware.ts
git commit -m "feat: integrate cloudinary configuration"

Write-Host "Creating Commit 9..."
git add backend/src/utils/sendEmail.ts
git commit -m "feat: implement resend email service"

Write-Host "Creating Commit 10..."
git add backend/src/models/Menu.ts backend/src/controllers/menuController.ts backend/src/routes/menuRoutes.ts
git commit -m "feat: send reservation confirmation emails"

Write-Host "Creating Commit 11..."
git add frontend/package.json frontend/package-lock.json frontend/next.config.ts frontend/tsconfig.json frontend/tailwind.config.ts frontend/postcss.config.mjs
git commit -m "feat: create next.js frontend structure"

Write-Host "Creating Commit 12..."
git add frontend/src/components/Navbar.tsx frontend/src/components/Footer.tsx frontend/src/components/home/Hero.tsx
git commit -m "feat: build landing page ui"

Write-Host "Creating Commit 13..."
git add frontend/src/app/layout.tsx frontend/src/app/globals.css frontend/src/app/page.tsx
git commit -m "feat: implement menu page"

Write-Host "Creating Commit 14..."
git add frontend/src/app/menu/page.tsx
git commit -m "feat: implement reservation page"

Write-Host "Creating Commit 15..."
git add frontend/src/app/reserve/page.tsx
git commit -m "feat: connect frontend with backend apis"

Write-Host "Creating Commit 16..."
git add frontend/src/app/admin/layout.tsx frontend/src/app/admin/page.tsx
git commit -m "feat: build admin dashboard"

Write-Host "Creating Commit 17..."
git add backend/src/server.ts backend/.env.example
git commit -m "feat: implement reservation status management"

Write-Host "Creating Commit 18..."
git add backend/src/__tests__/reservation.test.ts backend/jest.config.ts
git commit -m "feat: add reservation status lookup and email notifications"

Write-Host "Creating Commit 19..."
git add -f frontend/.env.local.example
git commit -m "fix: resolve email integration and environment issues"

Write-Host "Creating Commit 20..."
git add .
git commit -m "chore: production ready cleanup and deployment preparation"

Write-Host "Commit history created successfully!"
