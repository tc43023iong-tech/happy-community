export enum Page {
  INTRO = 'INTRO',
  COMMUNITY_PLACES = 'COMMUNITY_PLACES',
  SOCIAL_OBSERVATION = 'SOCIAL_OBSERVATION',
  PUBLIC_MORALITY = 'PUBLIC_MORALITY',
  STORY_TIME = 'STORY_TIME'
}

export interface ActivityItem {
  id: string;
  name: string;
  emoji: string;
  description?: string;
}

export interface ScenarioProps {
  title: string;
  emoji: string;
  question: string;
  possibleAnswer: string;
}

export interface ObservationItem {
  id: string;
  term: string;
  icon: string;
  prompt: string;
  description: string;
}