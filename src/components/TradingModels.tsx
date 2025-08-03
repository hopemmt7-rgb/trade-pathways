import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  TrendingUp, 
  CheckCircle, 
  Wallet, 
  RefreshCw, 
  Zap,
  ArrowRight,
  Target,
  Award,
  DollarSign
} from 'lucide-react';

export interface TradingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

export interface TradingNode {
  id: string;
  name: string;
  color: string;
  gradient: string;
  description: string;
  models?: TradingModel[];
  steps?: TradingStep[];
}

export interface TradingModel {
  id: string;
  name: string;
  color: string;
  steps: TradingStep[];
}

const tradingFlow: TradingNode[] = [
  {
    id: 'evaluations',
    name: 'Evaluation Models',
    color: 'primary',
    gradient: 'from-blue-500 to-green-500',
    description: 'Traditional evaluation-based funding with proven track record',
    models: [
      {
        id: '1-step',
        name: '1-Step Evaluation',
        color: 'plan-1-step',
        steps: [
          {
            id: 1,
            title: 'Pay Evaluation Fee',
            description: 'Start with evaluation payment',
            icon: CreditCard,
            color: 'plan-1-step'
          },
          {
            id: 2,
            title: 'Trade with Targets',
            description: 'Meet profit target within drawdown limits',
            icon: Target,
            color: 'plan-1-step'
          },
          {
            id: 3,
            title: 'Pass Evaluation',
            description: 'Successfully complete the challenge',
            icon: CheckCircle,
            color: 'plan-1-step'
          },
          {
            id: 4,
            title: 'Get Funded Account',
            description: 'Receive your funded trading account',
            icon: Wallet,
            color: 'plan-1-step'
          },
          {
            id: 5,
            title: 'Withdraw Profits',
            description: 'Start earning and withdrawing profits',
            icon: DollarSign,
            color: 'plan-1-step'
          },
          {
            id: 6,
            title: 'Fee Refunded',
            description: 'Get evaluation fee back after 2nd payout',
            icon: RefreshCw,
            color: 'plan-1-step'
          }
        ]
      },
      {
        id: '2-step',
        name: '2-Step Evaluation',
        color: 'plan-2-step',
        steps: [
          {
            id: 1,
            title: 'Pay Evaluation Fee',
            description: 'Start with evaluation payment',
            icon: CreditCard,
            color: 'plan-2-step'
          },
          {
            id: 2,
            title: 'Phase 1 Challenge',
            description: 'Hit profit target with drawdown limits',
            icon: Target,
            color: 'plan-2-step'
          },
          {
            id: 3,
            title: 'Phase 2 Verification',
            description: 'Consistent performance verification',
            icon: TrendingUp,
            color: 'plan-2-step'
          },
          {
            id: 4,
            title: 'Pass Both Phases',
            description: 'Successfully complete both challenges',
            icon: CheckCircle,
            color: 'plan-2-step'
          },
          {
            id: 5,
            title: 'Get Funded Account',
            description: 'Receive your funded trading account',
            icon: Wallet,
            color: 'plan-2-step'
          },
          {
            id: 6,
            title: 'Withdraw Profits',
            description: 'Start earning and withdrawing profits',
            icon: DollarSign,
            color: 'plan-2-step'
          },
          {
            id: 7,
            title: 'Fee Refunded',
            description: 'Get evaluation fee back after 2nd payout',
            icon: RefreshCw,
            color: 'plan-2-step'
          }
        ]
      }
    ]
  },
  {
    id: 'flex',
    name: 'Flex Challenge',
    color: 'plan-flex',
    gradient: 'from-pink-500 to-rose-600',
    description: 'Flexible evaluation with lower upfront cost and pay-after-success model',
    steps: [
      {
        id: 1,
        title: 'Pay Small Setup Fee',
        description: 'Start with minimal upfront cost',
        icon: CreditCard,
        color: 'plan-flex'
      },
      {
        id: 2,
        title: 'Start Evaluation',
        description: 'Begin flexible evaluation process',
        icon: Target,
        color: 'plan-flex'
      },
      {
        id: 3,
        title: 'Pass Evaluation',
        description: 'Successfully complete the challenge',
        icon: CheckCircle,
        color: 'plan-flex'
      },
      {
        id: 4,
        title: 'Pay Full Fee',
        description: 'Complete payment after passing',
        icon: Award,
        color: 'plan-flex'
      },
      {
        id: 5,
        title: 'Get Funded Account',
        description: 'Receive your funded trading account',
        icon: Wallet,
        color: 'plan-flex'
      },
      {
        id: 6,
        title: 'Withdraw Profits',
        description: 'Start earning and withdrawing profits',
        icon: DollarSign,
        color: 'plan-flex'
      }
    ]
  },
  {
    id: 'instant',
    name: 'Instant Funding',
    color: 'plan-instant',
    gradient: 'from-yellow-500 to-orange-500',
    description: 'Skip evaluations entirely - start trading immediately with higher investment',
    steps: [
      {
        id: 1,
        title: 'Pay One-Time Fee',
        description: 'Higher fee for instant access',
        icon: CreditCard,
        color: 'plan-instant'
      },
      {
        id: 2,
        title: 'Start Trading Directly',
        description: 'Begin trading on funded account immediately',
        icon: Zap,
        color: 'plan-instant'
      },
      {
        id: 3,
        title: 'Withdraw Profits',
        description: 'Earn and withdraw profits from day one',
        icon: DollarSign,
        color: 'plan-instant'
      }
    ]
  }
];

const TradingModels = () => {
  const [activeNode, setActiveNode] = useState(0);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const { scrollY } = useScroll();
  
  // Auto-scroll based node switching
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate which node should be active based on scroll position
      // Each node takes up 100vh, so we divide by window height
      const nodeIndex = Math.floor((scrollPosition + windowHeight / 2) / windowHeight);
      
      const clampedIndex = Math.max(0, Math.min(nodeIndex, tradingFlow.length - 1));
      
      if (clampedIndex !== activeNode) {
        setActiveNode(clampedIndex);
        // Reset model selection when changing nodes
        if (clampedIndex !== 0) {
          setSelectedModel(null);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeNode]);

  const y = useTransform(scrollY, [0, 400], [0, -100]);

  return (
    <div className="bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="fixed bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />

      {/* Header - Fixed Section */}
      <motion.div 
        className="relative z-10 text-center py-20 h-screen flex flex-col justify-center"
        style={{ y }}
      >
        <motion.h1 
          className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          How It Works
        </motion.h1>
        <motion.p 
          className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Choose your path to funded trading. Each model is designed to match different trading styles and risk preferences.
        </motion.p>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex flex-col items-center space-y-2 text-muted-foreground">
            <span className="text-sm">Scroll to explore</span>
            <motion.div 
              className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-1 h-3 bg-primary rounded-full mt-2" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Sidebar Navigation */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-4">
        {tradingFlow.map((node, index) => (
          <motion.div
            key={node.id}
            className={`plan-nav-item ${activeNode === index ? 'active' : ''}`}
            style={{
              borderColor: activeNode === index ? `hsl(var(--${node.color}))` : undefined,
              backgroundColor: activeNode === index ? `hsl(var(--${node.color}) / 0.1)` : undefined
            }}
            onClick={() => {
              setActiveNode(index);
              setSelectedModel(null);
              // Scroll to the specific node section
              window.scrollTo({
                top: (index + 1) * window.innerHeight,
                behavior: 'smooth'
              });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center space-x-3 min-w-[200px]">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: `hsl(var(--${node.color}))` }}
              />
              <span className="font-medium text-sm">{node.name}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trading Flow Sections */}
      {tradingFlow.map((node, index) => (
        <motion.section
          key={node.id}
          className="min-h-screen relative z-10 flex items-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: activeNode === index ? 1 : 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-8 w-full">
            <AnimatePresence mode="wait">
              {activeNode === index && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.6 }}
                >
                  <TradingNodeFlow 
                    node={node} 
                    selectedModel={selectedModel}
                    onModelSelect={setSelectedModel}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      ))}
    </div>
  );
};

const TradingNodeFlow = ({ 
  node, 
  selectedModel, 
  onModelSelect 
}: { 
  node: TradingNode;
  selectedModel: string | null;
  onModelSelect: (model: string | null) => void;
}) => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Node Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 
          className="text-4xl font-bold mb-4"
          style={{ color: `hsl(var(--${node.color}))` }}
        >
          {node.name}
        </h2>
        <p className="text-lg text-muted-foreground">{node.description}</p>
      </motion.div>

      {/* Models Selection (for evaluation node) */}
      {node.models && (
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex justify-center space-x-6 mb-8">
            {node.models.map((model) => (
              <motion.button
                key={model.id}
                className={`px-6 py-3 rounded-xl font-semibold border-2 transition-all ${
                  selectedModel === model.id 
                    ? 'border-opacity-100 shadow-lg' 
                    : 'border-opacity-30 hover:border-opacity-60'
                }`}
                style={{
                  borderColor: `hsl(var(--${model.color}))`,
                  backgroundColor: selectedModel === model.id 
                    ? `hsl(var(--${model.color}) / 0.1)` 
                    : 'transparent',
                  color: `hsl(var(--${model.color}))`
                }}
                onClick={() => onModelSelect(selectedModel === model.id ? null : model.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {model.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Steps Flow */}
      <div className="relative">
        {/* Connection Lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* Show steps based on selection */}
        <AnimatePresence mode="wait">
          {node.models && selectedModel ? (
            <motion.div
              key={selectedModel}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ModelStepsGrid 
                steps={node.models.find(m => m.id === selectedModel)?.steps || []} 
              />
              <ModelLearnMore 
                model={node.models.find(m => m.id === selectedModel)!} 
              />
            </motion.div>
          ) : node.models && !selectedModel ? (
            <motion.div
              key="select-prompt"
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-muted-foreground">
                Select an evaluation model to view its workflow
              </h3>
              <p className="text-muted-foreground">
                Choose between 1-Step or 2-Step evaluation process above
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="direct-steps"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ModelStepsGrid steps={node.steps || []} />
              <ModelLearnMore 
                model={{ 
                  id: node.id, 
                  name: node.name, 
                  color: node.color, 
                  steps: node.steps || [] 
                }} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ModelStepsGrid = ({ steps }: { steps: TradingStep[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
    {steps.map((step, index) => (
      <motion.div
        key={step.id}
        className="trading-card relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.1,
          type: "spring",
          stiffness: 100
        }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: `0 20px 80px hsl(var(--${step.color}) / 0.3)`
        }}
      >
        {/* Step Number */}
        <div className="absolute -top-6 -left-6 step-indicator">
          <span className="text-white font-bold">{step.id}</span>
        </div>

        {/* Step Content */}
        <div className="text-center space-y-4">
          <div 
            className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
            style={{ backgroundColor: `hsl(var(--${step.color}) / 0.2)` }}
          >
            <step.icon 
              className="w-8 h-8"
              style={{ color: `hsl(var(--${step.color}))` }}
            />
          </div>
          
          <h3 className="text-xl font-semibold">{step.title}</h3>
          <p className="text-muted-foreground">{step.description}</p>
        </div>

        {/* Connection Arrow */}
        {index < steps.length - 1 && (
          <motion.div 
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-primary"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <ArrowRight className="w-6 h-6" />
          </motion.div>
        )}
      </motion.div>
    ))}
  </div>
);

const ModelLearnMore = ({ model }: { model: TradingModel }) => (
  <motion.div 
    className="text-center mt-16"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
  >
    <motion.button
      className="px-8 py-4 rounded-xl font-semibold text-lg"
      style={{
        background: `linear-gradient(135deg, hsl(var(--${model.color})), hsl(var(--${model.color})) / 0.8)`,
        color: 'white'
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: `0 10px 40px hsl(var(--${model.color}) / 0.4)`
      }}
      whileTap={{ scale: 0.95 }}
      onClick={() => window.open('#', '_blank')}
    >
      Learn More About {model.name}
      <ArrowRight className="inline-block w-5 h-5 ml-2" />
    </motion.button>
  </motion.div>
);

export default TradingModels;