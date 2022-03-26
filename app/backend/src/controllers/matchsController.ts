import { Request, Response } from 'express';
import clubService from '../services/clubService';
import matchService from '../services/matchService';
import MESSAGE from '../utils/messages';

const getMatchs = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  let matchs;

  if (!inProgress) {
    matchs = await matchService.getAllMatchs();
    return res.status(matchs.status).json(matchs.data);
  }

  const convertInProgress = (inProgress === 'true');

  matchs = await matchService.getMatchsByProgress(convertInProgress);

  return res.status(matchs.status).json(matchs.data);
};

const saveMatch = async (req: Request, res: Response) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(401).json({ message: MESSAGE.ERR_MATCH_EQUAL_TEAMS });
  }

  try {
    const dataMatch = await matchService.createMatch({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });

    return res.status(201).json(dataMatch);
  } catch (error) {
    return res.status(401).json({ message: MESSAGE.ERR_INVALID_ID_TEAM });
  }
};

const finishMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const finishedMatch = await matchService.finishMatch(id);

  return res.status(200).json(finishedMatch);
};

const editMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;

  if (homeTeamGoals === undefined || awayTeamGoals === undefined) {
    const finishedMatch = await matchService.finishMatch(id);
    return res.status(200).json(finishedMatch);
  }

  const editedMatch = await matchService.editMatch(id, { homeTeamGoals, awayTeamGoals });

  return res.status(200).json(editedMatch);
};

const getAllRatings = async (req: Request, res: Response) => {
  const { data } = await clubService.getAll();
  const ratings = await matchService.generateRatings(data, true, true);

  return res.status(200).json(ratings);
};

const getHomeRatings = async (req: Request, res: Response) => {
  const { data } = await clubService.getAll();
  const ratings = await matchService.generateRatings(data, true, false);

  return res.status(200).json(ratings);
};

const getAwayRatings = async (req: Request, res: Response) => {
  const { data } = await clubService.getAll();
  const ratings = await matchService.generateRatings(data, false, true);

  return res.status(200).json(ratings);
};

export default {
  getMatchs,
  saveMatch,
  finishMatch,
  editMatch,
  getAllRatings,
  getHomeRatings,
  getAwayRatings,
};
