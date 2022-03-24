import Matchs from '../database/models/Match';
import Clubs from '../database/models/Club';

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

export default { getAllMatchs, getMatchsByProgress };
