import { useState } from 'react';
import { Brain, CheckCircle2, Loader2, MessageSquare, Plus, Search, Trash2, Wand2 } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cn,
  Input,
  ScrollArea,
  Textarea,
} from '@libs/components';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  lastUpdated: Date;
};

export const AIGeneratorPage = () => {
  const query = useQuery();
  const initialPrompt = query.get('prompt') || '';
  const [prompt, setPrompt] = useState(initialPrompt);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showWorkout, setShowWorkout] = useState(false);
  const [addedToRoutine, setAddedToRoutine] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeConversation, setActiveConversation] = useState<string | null>(null);

  // Mock conversation history
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 'conv1',
      title: 'HIIT Cardio Workout',
      messages: [
        {
          id: 'msg1',
          role: 'user',
          content: 'I need a quick 15-minute HIIT workout I can do at home',
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        },
        {
          id: 'msg2',
          role: 'assistant',
          content: "Here's a 15-minute HIIT workout you can do at home with no equipment...",
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      ],
      lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'conv2',
      title: 'Strength Training Plan',
      messages: [
        {
          id: 'msg3',
          role: 'user',
          content: 'Can you create a 4-week strength training program for building muscle?',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        },
        {
          id: 'msg4',
          role: 'assistant',
          content: "Here's a 4-week strength training program designed to build muscle...",
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
        {
          id: 'msg5',
          role: 'user',
          content: 'Can you modify it to focus more on upper body?',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
        {
          id: 'msg6',
          role: 'assistant',
          content: "Certainly! Here's the modified program with more focus on upper body...",
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
      ],
      lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'conv3',
      title: 'Recovery Day Routine',
      messages: [
        {
          id: 'msg7',
          role: 'user',
          content: 'What should I do on recovery days to maximize my progress?',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        },
        {
          id: 'msg8',
          role: 'assistant',
          content: "Recovery days are crucial for muscle repair and growth. Here's what I recommend...",
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        },
      ],
      lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  ]);

  // Function to simulate AI generating a workout
  const generateWorkout = () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setShowWorkout(false);
    setAddedToRoutine(false);

    // Create a new message
    const newUserMessage: Message = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: prompt,
      timestamp: new Date(),
    };

    // Simulate API call delay
    setTimeout(() => {
      // Create AI response message
      const newAIMessage: Message = {
        id: `msg-${Date.now()}-ai`,
        role: 'assistant',
        content:
          "Here's a HIIT Cardio Blast workout: 3 sets of Jumping Jacks (30s), Mountain Climbers (30s), and Burpees (30s) with 15s rest between exercises. This high-intensity interval training will maximize calorie burn and improve cardiovascular health.",
        timestamp: new Date(),
      };

      // If there's an active conversation, add to it
      if (activeConversation) {
        setConversations((prevConversations) =>
          prevConversations.map((conv) =>
            conv.id === activeConversation
              ? {
                  ...conv,
                  messages: [...conv.messages, newUserMessage, newAIMessage],
                  lastUpdated: new Date(),
                }
              : conv
          )
        );
      } else {
        // Create a new conversation
        const newConversation: Conversation = {
          id: `conv-${Date.now()}`,
          title: prompt.length > 30 ? prompt.substring(0, 30) + '...' : prompt,
          messages: [newUserMessage, newAIMessage],
          lastUpdated: new Date(),
        };

        setConversations((prev) => [...prev, newConversation]);
        setActiveConversation(newConversation.id);
      }

      setIsGenerating(false);
      setShowWorkout(true);
      setPrompt('');
    }, 1500);
  };

  // Function to add the workout to the daily routine
  const addToRoutine = () => {
    setAddedToRoutine(true);
    setTimeout(() => {
      setAddedToRoutine(false);
    }, 3000);
  };

  // Function to start a new conversation
  const startNewConversation = () => {
    setActiveConversation(null);
    setPrompt('');
    setShowWorkout(false);
  };

  // Function to delete a conversation
  const deleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations((prev) => prev.filter((conv) => conv.id !== id));
    if (activeConversation === id) {
      setActiveConversation(null);
      setShowWorkout(false);
    }
  };

  // Filter conversations based on search query
  const filteredConversations = conversations
    .filter(
      (conv) =>
        conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.messages.some((msg) => msg.content.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime());

  // Get the active conversation object
  const currentConversation = activeConversation ? conversations.find((conv) => conv.id === activeConversation) : null;

  // Format date for display
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Workout Generator</h1>
        <p className="text-muted-foreground">Create personalized workouts with AI assistance</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        {/* Chat History Sidebar */}
        <div className="flex flex-col h-[calc(100vh-220px)] border rounded-lg">
          <div className="p-4 border-b">
            <h2 className="font-semibold mb-2">Conversation History</h2>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-2">
              <Button variant="outline" className="w-full justify-start mb-2" onClick={startNewConversation}>
                <Plus className="mr-2 h-4 w-4" />
                New Conversation
              </Button>

              {filteredConversations.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No conversations found</div>
              ) : (
                <div className="space-y-1">
                  {filteredConversations.map((conv) => (
                    <div
                      key={conv.id}
                      className={cn(
                        'flex items-start justify-between p-2 rounded-md cursor-pointer hover:bg-muted group',
                        activeConversation === conv.id && 'bg-muted'
                      )}
                      onClick={() => {
                        setActiveConversation(conv.id);
                        setShowWorkout(true);
                      }}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{conv.title}</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {conv.messages.length} messages · {formatDate(conv.lastUpdated)}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100"
                        onClick={(e) => deleteConversation(conv.id, e)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Main Chat Area */}
        <div className="flex flex-col h-[calc(100vh-220px)]">
          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4 border rounded-lg mb-4">
            {!activeConversation ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <Brain className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">AI Workout Generator</h3>
                <p className="text-muted-foreground mb-4">
                  Describe the workout you want, and our AI will create a personalized routine
                </p>
                <div className="flex flex-wrap justify-center gap-2 max-w-md">
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10"
                    onClick={() => setPrompt('A quick 15-minute HIIT workout I can do at home')}
                  >
                    Quick 15-min HIIT
                  </Badge>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10"
                    onClick={() => setPrompt('A beginner-friendly strength workout for building muscle')}
                  >
                    Beginner strength
                  </Badge>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10"
                    onClick={() => setPrompt('A 30-minute core workout to strengthen my abs')}
                  >
                    30-min core workout
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {currentConversation?.messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex max-w-[80%] rounded-lg p-4',
                      message.role === 'user' ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted'
                    )}
                  >
                    <div>
                      <div className="mb-1 text-xs opacity-70">
                        {message.role === 'user' ? 'You' : 'AI Assistant'} ·{' '}
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div>{message.content}</div>
                    </div>
                  </div>
                ))}

                {showWorkout && activeConversation && (
                  <div className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>HIIT Cardio Blast</CardTitle>
                        <CardDescription>
                          High-intensity interval training to maximize calorie burn and cardiovascular health
                        </CardDescription>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge variant="secondary">HIIT</Badge>
                          <Badge variant="secondary">Cardio</Badge>
                          <Badge variant="secondary">Fat Burning</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm font-medium">Duration</p>
                              <p className="text-lg font-bold">25 min</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Difficulty</p>
                              <p className="text-lg font-bold">Advanced</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">XP Reward</p>
                              <p className="text-lg font-bold text-primary">+200 XP</p>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold mb-2">Exercises</h3>
                            <ul className="space-y-2">
                              <li className="rounded-md border p-3">
                                <div className="font-medium">1. Jumping Jacks</div>
                                <div className="grid grid-cols-3 gap-3 mt-2 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Sets:</span> 3
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Reps:</span> 30 seconds
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Rest:</span> 15s
                                  </div>
                                </div>
                              </li>
                              <li className="rounded-md border p-3">
                                <div className="font-medium">2. Mountain Climbers</div>
                                <div className="grid grid-cols-3 gap-3 mt-2 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Sets:</span> 3
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Reps:</span> 30 seconds
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Rest:</span> 15s
                                  </div>
                                </div>
                              </li>
                              <li className="rounded-md border p-3">
                                <div className="font-medium">3. Burpees</div>
                                <div className="grid grid-cols-3 gap-3 mt-2 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Sets:</span> 3
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Reps:</span> 30 seconds
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Rest:</span> 15s
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full gap-2" onClick={addToRoutine} disabled={addedToRoutine}>
                          {addedToRoutine ? (
                            <>
                              <CheckCircle2 className="h-4 w-4" />
                              Added to Routine!
                            </>
                          ) : (
                            <>
                              <Plus className="h-4 w-4" />
                              Add to Daily Routine
                            </>
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                )}

                {isGenerating && (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
                    <span>Generating workout...</span>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Input Area */}
          <div className="flex gap-2">
            <Textarea
              placeholder="Describe the workout you want, e.g., 'A 30-minute HIIT workout for fat burning'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 min-h-[80px]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  generateWorkout();
                }
              }}
            />
            <Button className="self-end" onClick={generateWorkout} disabled={isGenerating || !prompt.trim()}>
              {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
