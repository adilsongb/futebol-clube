import Matchs from '../database/models/Match';
import Clubs from '../database/models/Club';
import { getTotalGoals, getTotals, getTotalStatus } from '../helpers/getTotals';

const getAllMatchs = async () => {
  const matchsData = await Matchs.findAll({
    include: [
      { model: Clubs, as: 'homeClub', attributes: { exclude: ['id'] } },
      { model: Clubs, as: 'awayClub', attributes: { exclude: ['id'] } },
    ],
  });

  return { status: 200, data: matchsData };
};

const getMatchsByProgress = async (inProgress: boolean) => {
  const matchsData = await Matchs.findAll({
    where: { inProgress },
    include: [
      { model: Clubs, as: 'homeClub', attributes: { exclude: ['id'] } },
      { model: Clubs, as: 'awayClub', attributes: { exclude: ['id'] } },
    ] });

  return { status: 200, data: matchsData };
};

const createMatch = async (data: object) => {
  const newMatch = await Matchs.create({ ...data });

  return newMatch;
};

const finishMatch = async (id: string) => {
  const inProgress = false;
  const updateMatch = await Matchs.update({ inProgress }, { where: { id } });

  return updateMatch;
};

type UpdateMatchGoals = { homeTeamGoals: number, awayTeamGoals: number };

const editMatch = async (id: string, { homeTeamGoals, awayTeamGoals }: UpdateMatchGoals) => {
  const updateMatch = await Matchs
    .update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

  return updateMatch;
};

const generateClassification = async (clubs: Clubs[]) => {
  const { data } = await getMatchsByProgress(false);

  const ratings = clubs.map(({ id, clubName }: Clubs) => {
    const name = clubName;
    const totals = getTotals(id, data);
    const totalStatus = getTotalStatus(id, data);
    const totalGoals = getTotalGoals(id, data);
    let efficiency = (totals.totalPoints / (totals.totalGames * 3)) * 100;
    efficiency = Math.round(efficiency * 100) / 100;

    return { name, ...totals, ...totalStatus, ...totalGoals, efficiency };
  });

  return ratings;
};

export default {
  getAllMatchs,
  getMatchsByProgress,
  createMatch,
  finishMatch,
  editMatch,
  generateClassification,
};
