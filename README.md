# Fairness AI Insights

A comprehensive web application for managing and analyzing AI models with a focus on fairness metrics and insights. This application helps users upload datasets, train models, and monitor fairness metrics across different demographic groups.

## Features

- **Dataset Management**
  - Upload and manage datasets
  - View dataset statistics and distributions
  - Track dataset versions and changes

- **Model Training & Management**
  - Train new AI models
  - Monitor training progress
  - View model performance metrics
  - Delete models with confirmation

- **Fairness Analysis**
  - Monitor fairness metrics across demographic groups
  - Visualize bias and fairness scores
  - Set fairness thresholds
  - Receive fairness warnings

- **User Profile & Settings**
  - Manage account information
  - Configure application settings
  - Enable two-factor authentication
  - Change password securely

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **UI Components**: Shadcn UI
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Routing**: React Router
- **Charts**: Recharts
- **Form Handling**: React Hook Form
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LearnyN24/Fairnessapp.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Fairnessapp
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/         # Reusable UI components
├── context/           # React Context providers
├── pages/             # Application pages
├── lib/               # Utility functions
└── App.tsx            # Main application component
```

## Deployment

### Using Lovable

Simply open [Lovable](https://lovable.dev/projects/cbc27bfc-a098-4464-9980-d8ed994aa819) and click on Share -> Publish.

### Custom Domain

To connect a custom domain:
1. Navigate to Project > Settings > Domains
2. Click Connect Domain
3. Follow the instructions in [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Shadcn UI for the beautiful component library
- Recharts for the charting capabilities
- The React and TypeScript communities for their excellent documentation and tools

## Contact

Your Name - [@YourTwitter](https://twitter.com/YourTwitter)

Project Link: [https://github.com/LearnyN24/Fairnessapp](https://github.com/LearnyN24/Fairnessapp)
