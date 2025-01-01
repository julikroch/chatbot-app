import { BOT_RESPONSES } from '../constants';

/**
 * Generates a random bot response from the list of responses.
 * @returns - The bot response.
 */

export const generateBotResponse = () =>
  BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
