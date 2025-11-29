#!/bin/bash

echo "🚀 Setting up Blockchain Testing Frameworks..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔧 Setting up environment variables..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file from template"
else
    echo "✅ .env file already exists"
fi

echo "🏗 Compiling contracts..."
npm run compile

echo "✅ Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Review and configure your .env file"
echo "2. Run tests: npm test"
echo "3. Check out the examples in src/examples/"
