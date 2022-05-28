import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy},
    { sendMail: sendMailSpy}
)

describe('Submit feedback', () => {
    it('should be able to submit feedbackk', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example feedback',
            screenshot: 'data:image/png;base64'
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit feedback without a type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example feedback',
            screenshot: 'data:image/png;base64,khsdkjfhlaskjd'
        })).rejects.toThrow()
    });

    it('should not be able to submit feedback without a comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64'
        })).rejects.toThrow()
    });

    it('should not be able to submit feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example feedback',
            screenshot: 'teste.jpg'
        })).rejects.toThrow()
    });
})