import Rating from '../interfaces/rating';

const tiebreaker = (ratingA: Rating, ratingB: Rating) => {
  if (ratingA.totalVictories !== ratingB.totalVictories) {
    if (ratingA.totalVictories > ratingB.totalVictories) return -1;
    return 1;
  }

  if (ratingA.goalsBalance !== ratingB.goalsBalance) {
    if (ratingA.goalsBalance > ratingB.goalsBalance) return -1;
    return 1;
  }

  if (ratingA.goalsFavor !== ratingB.goalsFavor) {
    if (ratingA.goalsFavor > ratingB.goalsFavor) return -1;
    return 1;
  }

  if (ratingA.goalsOwn > ratingB.goalsOwn) return -1;
  return 1;
};

const orderRatings = (ratingA: Rating, ratingB: Rating) => {
  if (ratingA.totalPoints !== ratingB.totalPoints) {
    if (ratingA.totalPoints > ratingB.totalPoints) return -1;
    return 1;
  }

  const tiebreakerResult = tiebreaker(ratingA, ratingB);
  return tiebreakerResult;
};

export default orderRatings;
