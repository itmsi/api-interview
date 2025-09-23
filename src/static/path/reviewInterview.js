const reviewInterviewPaths = {
  '/reviewInterview': {
    post: {
      tags: ['Review Interview'],
      summary: 'Get review interview data',
      description: 'Retrieve candidates who have completed interviews with filtering, pagination, and sorting using POST method',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GetReviewInterviewRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Review interview data retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ReviewInterviewResponse'
              }
            }
          }
        },
        400: {
          description: 'Validation error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized'
        },
        500: {
          description: 'Internal server error'
        }
      }
    }
  }
};

module.exports = reviewInterviewPaths;
