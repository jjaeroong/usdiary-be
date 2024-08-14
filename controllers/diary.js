const Diary = require('../models/diary');
const User = require('../models/user');

//일기 조회
// handlers.js
exports.renderDiary = async (req, res) => {
  try {
      const diaryId = req.params.diary_id;
      const diary = await Diary.findByPk(diaryId);

      if (!diary) {
          return res.status(404).json({ message: 'Diary not found' });
      }
      console.log(diary)
      res.json(diary);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
};

//일기 작성
exports.createDiary = (req, res) => {
  const newDiary = {
      diary_title: req.body.diary_title,
      diary_content: req.body.diary_content,
      diary_cate: req.body.diary_cate,
      access_level: req.body.access_level,
      board_id: req.body.board_id,
      diary_emotion: req.body.diary_emotion,
      cate_num: req.body.cate_num,
      post_photo: req.file ? req.file.path : null
  };
  console.log(newDiary)
  // 예시 응답 데이터
  res.status(201).json({
      message: 'Diary created',
      data: newDiary
  });
};

// 일기 삭제 
exports.deleteDiary = async (req, res) => {
    const diaryId = req.params.diary_id;

    try {
        // 일기가 존재하는지 확인
        const diary = await Diary.findByPk(diaryId);

        if (!diary) {
            return res.status(404).json({ message: 'Diary not found' });
        }

        // 일기 삭제
        await Diary.destroy({
            where: {
                diary_id: diaryId
            }
        });

        return res.status(200).json({ message: 'Diary deleted successfully' });
    } catch (error) {
        console.error('Error deleting diary:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};