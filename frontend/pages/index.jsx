import HeroScene from '../components/HeroScene';
import BlockchainAnimation from '../components/BlockchainAnimation';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <HeroScene />
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-6xl font-bold text-white mb-6">
          Smart Contract Audit Platform
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          AI-powered security analysis for Ethereum and Starknet contracts
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg">
          Start Audit
        </button>
      </div>

      <BlockchainAnimation />
    </div>
  );
}
