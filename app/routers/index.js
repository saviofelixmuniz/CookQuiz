/**
 * @author Sávio Muniz
 */

const express = require('express');

const router = express.Router();

const quizCtrl = require('../controllers/quiz-controller');
const answersCtrl = require('../controllers/answers-controller');
const groupCtrl = require('../controllers/groups-controller');
const statusCtrl = require('../controllers/status-controller');

router.post('/quiz', quizCtrl.createQuiz);
router.get('/quiz', quizCtrl.getQuizes);
router.put('/quiz/:quizId', quizCtrl.updateQuiz);
router.put('/quiz/:quizId/active', quizCtrl.setActive);
router.put('/quiz/inactive/all', quizCtrl.deactivateAll);
router.get('/quiz/active', quizCtrl.getActive);

router.post('/answers', answersCtrl.createAnswer);
router.get('/groups/:groupId/answers', answersCtrl.getAnswersByGroup);
router.get('/quiz/:quizId/answers', answersCtrl.getAnswersByQuiz);

router.post('/groups', groupCtrl.createGroup);
router.get('/groups', groupCtrl.getGroups);

router.post('/status', statusCtrl.upsertStatus);
router.post('/status/existence', statusCtrl.checkUserExistence);

module.exports = router;
