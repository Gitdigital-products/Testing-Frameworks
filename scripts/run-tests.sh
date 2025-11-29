#!/bin/bash

echo "🧪 Running Blockchain Tests..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to run tests and handle errors
run_test() {
    local framework=$1
    local command=$2
    
    echo -e "\n${YELLOW}Running $framework tests...${NC}"
    if eval $command; then
        echo -e "${GREEN}✅ $framework tests passed!${NC}"
    else
        echo -e "${RED}❌ $framework tests failed!${NC}"
        exit 1
    fi
}

# Run Hardhat tests
run_test "Hardhat" "npm run test:hardhat"

# Run Truffle tests if truffle is installed
if [ -f "node_modules/.bin/truffle" ]; then
    run_test "Truffle" "npm run test:truffle"
else
    echo -e "${YELLOW}⚠️  Truffle not installed, skipping Truffle tests${NC}"
fi

# Run coverage if available
if npm run test:coverage 2>/dev/null; then
    echo -e "\n${GREEN}✅ Coverage report generated!${NC}"
fi

echo -e "\n${GREEN}🎉 All tests completed successfully!${NC}"
