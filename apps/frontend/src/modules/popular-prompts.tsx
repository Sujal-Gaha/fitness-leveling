import { ArrowRight, Dumbbell, Heart, Lightbulb, Sparkles, Timer, Zap } from 'lucide-react';
import { JSX } from 'react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@libs/components';
import { Link } from 'react-router-dom';

type Prompt = {
  title: string;
  prompt: string;
  tags: string[];
};

type Category = {
  id: string;
  label: string;
  icon: JSX.Element;
  description: string;
  prompts: Prompt[];
};

const categories: Category[] = [
  {
    id: 'beginners',
    label: 'For Beginners',
    icon: <Lightbulb className="h-4 w-4" />,
    description: "Perfect starting points if you're new to fitness",
    prompts: [
      {
        title: "Beginner's First Workout",
        prompt:
          "I'm completely new to fitness. Can you create a simple full-body workout for beginners with no equipment?",
        tags: ['Beginner', 'No Equipment', 'Full Body'],
      },
      {
        title: 'Getting Started Guide',
        prompt:
          "I want to start a fitness journey but don't know where to begin. What should my first 2 weeks look like?",
        tags: ['Beginner', 'Plan', 'Guide'],
      },
      {
        title: 'Fitness Terms Explained',
        prompt: 'Can you explain common fitness terms like sets, reps, HIIT, and progressive overload in simple terms?',
        tags: ['Education', 'Terminology'],
      },
      {
        title: 'Beginner Stretching Routine',
        prompt: "I need a basic stretching routine to do before and after workouts. I'm a complete beginner.",
        tags: ['Stretching', 'Mobility', 'Beginner'],
      },
    ],
  },
  {
    id: 'quick-workouts',
    label: 'Quick Workouts',
    icon: <Timer className="h-4 w-4" />,
    description: "Effective workouts when you're short on time",
    prompts: [
      {
        title: '15-Minute Morning Energizer',
        prompt: 'I need a quick 15-minute workout I can do in the morning to boost my energy for the day.',
        tags: ['Quick', 'Morning', 'Energy'],
      },
      {
        title: 'Office Break Workout',
        prompt: 'What exercises can I do during a 10-minute break at my desk to stay active during work?',
        tags: ['Office', 'Quick', 'Low Impact'],
      },
      {
        title: 'HIIT in 20 Minutes',
        prompt: 'Create a high-intensity 20-minute HIIT workout that will maximize calorie burn in minimal time.',
        tags: ['HIIT', 'Intense', 'Fat Burning'],
      },
      {
        title: '5-Minute Core Blast',
        prompt: 'I only have 5 minutes. Give me the most effective core exercises I can do in that time.',
        tags: ['Core', 'Quick', 'Abs'],
      },
    ],
  },
  {
    id: 'specific-goals',
    label: 'Specific Goals',
    icon: <Dumbbell className="h-4 w-4" />,
    description: 'Targeted workouts for particular fitness objectives',
    prompts: [
      {
        title: 'Weight Loss Focus',
        prompt: "I want to lose 10 pounds. What's the most effective workout routine I should follow for fat loss?",
        tags: ['Weight Loss', 'Fat Burning', 'Cardio'],
      },
      {
        title: 'Muscle Building',
        prompt: "I want to build muscle but don't have access to a gym. Create a home workout plan for muscle growth.",
        tags: ['Muscle Building', 'Strength', 'Home Workout'],
      },
      {
        title: 'Improve Endurance',
        prompt: 'How can I improve my cardiovascular endurance over 4 weeks? I can run for about 10 minutes currently.',
        tags: ['Cardio', 'Endurance', 'Running'],
      },
      {
        title: 'Flexibility Improvement',
        prompt:
          "I'm very inflexible and can barely touch my toes. Create a routine to improve my flexibility over time.",
        tags: ['Flexibility', 'Stretching', 'Mobility'],
      },
    ],
  },
  {
    id: 'health-concerns',
    label: 'Health Concerns',
    icon: <Heart className="h-4 w-4" />,
    description: 'Workouts adapted for specific health situations',
    prompts: [
      {
        title: 'Low Impact for Joints',
        prompt: "I have sensitive knees. What are some effective low-impact exercises that won't stress my joints?",
        tags: ['Low Impact', 'Joint Friendly', 'Rehabilitation'],
      },
      {
        title: 'Back Pain Relief',
        prompt: 'I have mild lower back pain. What exercises can help strengthen my back and reduce pain?',
        tags: ['Back Pain', 'Rehabilitation', 'Strength'],
      },
      {
        title: 'Pregnancy-Safe Workout',
        prompt: "I'm in my second trimester of pregnancy. What safe exercises can I do to stay active?",
        tags: ['Pregnancy', 'Safe', 'Moderate'],
      },
      {
        title: 'Senior Fitness',
        prompt:
          "I'm 65 years old and want to stay active. What exercises are appropriate for my age to maintain strength and balance?",
        tags: ['Senior', 'Balance', 'Strength'],
      },
    ],
  },
];

const PromptCard = ({ prompt }: { prompt: Prompt }) => {
  return (
    <Card className="overflow-hidden border-primary/20 hover:border-primary/50 transition-colors">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-base">{prompt.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">"{prompt.prompt}"</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {prompt.tags.map((tag, tagIndex) => (
            <Badge key={tagIndex} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link
            to={`/ai-generator?prompt=${encodeURIComponent(prompt.prompt)}`}
            className="flex items-center justify-center"
          >
            <Zap className="mr-2 h-3.5 w-3.5" />
            Use This Prompt
            <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export const PopularPromptsModule = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-primary" />
            Popular Fitness Prompts
          </h2>
          <p className="text-muted-foreground">
            Not sure what to ask? Try these popular prompts to get started on your fitness journey
          </p>
        </div>
      </div>

      <Tabs defaultValue="beginners" className="space-y-4">
        <TabsList className="flex flex-wrap h-auto">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1 h-9">
              {category.icon}
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {category.icon}
                  <span className="ml-2">{category.label}</span>
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {category.prompts.map((prompt, index) => (
                    <PromptCard key={index} prompt={prompt} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export const PopularPrompts = () => {
  return <PopularPromptsModule categories={categories} />;
};
