const COMMENT_MIN_LENGTH = 5;
const COMMENT_MAX_LENGTH = 1024;
const RATING_MIN = 1;
const RATING_MAX = 5;

export const CreateCommentValidationConfig = {
  text: {
    minLength: {
      value: COMMENT_MIN_LENGTH,
      message: `Minimum text length must be ${COMMENT_MIN_LENGTH}`,
    },
    maxLength: {
      value: COMMENT_MAX_LENGTH,
      message: `Maximum text length must be ${COMMENT_MAX_LENGTH}`,
    },
  },
  rating: {
    invalidFormat: 'Rating must be an integer',
    min: {
      value: RATING_MIN,
      message: `Minimum rating is ${RATING_MIN}`,
    },
    max: {
      value: RATING_MAX,
      message: `Minimum rating is ${RATING_MAX}`,
    },
  },
};
