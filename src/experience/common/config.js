export default {
  course_config: {
    times: [5, 12, 20, 32, 40, 52, 60, 72],
    course: [
      {
        // 708 * 861
        index: 0,
        begin: 26, // 00:29
        end: 46,
        turn_time: 30, // 翻转时间
        type: 'flashcard',
        word: 'skateboard',
        fanmian: 'http://file.lexislive.com.cn/resource/201811/8c69a8ce-1ce6-40b8-a7a9-40e1a3d9344a.png',
        zhengmian: 'http://file.lexislive.com.cn/resource/201811/d10a24d2-dc10-48c2-8b3d-1b1d439346aa.png'
      },
      // {
      //   // 733 * 890
      //   index: 1,
      //   begin: 100,
      //   end: 116,
      //   type: 'story',
      //   title: 'Read and Match',
      //   img: 'http://file.lexislive.com.cn/resource/201811/c04872b8-5a20-4785-91de-db1360d70dd8.jpg'
      // },
      {
        // 1038 * 890
        index: 2,
        begin: 55, // 00:55
        end: 64, // 01:04
        countdown_time: 61,
        interact: 1,
        type: 'question',
        title: 'Read and Match',
        question_title: 'skateboard',
        option: [
          {
            img: 'http://file.lexislive.com.cn/resource/201811/a7383a88-e823-4a0b-9879-a0f940286c68.jpg',
            right: 1
          },
          {
            img: 'http://file.lexislive.com.cn/resource/201811/da1c738a-a935-45e1-ab61-c494551e4276.jpg',
            right: 0
          }
        ]
      },
      // {
      //   index: 3,
      //   begin: 112, // 01:52
      //   end: 118, // 01:58
      //   type: 'story',
      //   title: 'Listen and Choose',
      //   img: 'http://file.lexislive.com.cn/resource/201811/f451c88f-140b-45a0-ade8-df8f28330650.jpg'
      // },
      {
        // 1860 * 890
        index: 4,
        begin: 73, // 01:15
        end: 106, // 01:46
        countdown_time: 102, // 01:44
        interact: 1,
        type: 'game',
        title: 'Listen and Choose',
        question_title: 'This is my skateboard.',
        option: [
          {
            img: 'http://file.lexislive.com.cn/resource/201811/ae60076d-b774-43c7-ba53-fc8f204b599b.jpg',
            right: 0
          },
          {
            img: 'http://file.lexislive.com.cn/resource/201811/4668c217-ed81-4042-9d53-1ccf1ba76855.jpg',
            right: 0
          },
          {
            img: 'http://file.lexislive.com.cn/resource/201811/4071fb42-beae-49de-a5df-d51a06e92efc.jpg',
            right: 1
          },
          {
            img: 'http://file.lexislive.com.cn/resource/201811/b715578c-76c7-4800-822b-09254fc73f81.jpg',
            right: 0
          }
        ]
      },
      {
        index: 5,
        begin: 112, // 01:52
        end: 118, // 01:58
        type: 'story',
        title: 'Listen to me',
        img: 'http://file.lexislive.com.cn/resource/201811/c04872b8-5a20-4785-91de-db1360d70dd8.jpg'
      },
      {
        index: 6,
        begin: 120, // 02:00
        end: 144, // 02:24
        countdown_time: 141, // 4:18
        interact: 1,
        type: 'story_question',
        story: {
          // 733 * 890
          title: 'Listen to me',
          img: 'http://file.lexislive.com.cn/resource/201811/77e5d745-dcf3-4574-a4ad-2ee2f908a3ba.jpg',
        },
        question: {
          // 1038 * 890
          title: 'Where can you ride on a skateboard?',
          question_title: '',
          option: [
            {
              text: 'on the road',
              right: 0
            },
             {
              text: 'at school',
              right: 0
            },
            {
              text: 'in the park',
              right: 1
            }
          ]
        }
      },
      {
        index: 7,
        begin: 157, // 02:37
        end: 183, // 03:03
        countdown_time: 180, // 5:06
        interact: 1,
        type: 'story_question',
        story: {
          title: 'Listen to me',
          img: 'http://file.lexislive.com.cn/resource/201811/43812143-219a-42ad-be3b-cab91ebf5577.jpg',
        },
        question: {
          title: 'What can you do on a skateboard? You can jump _____ .',
          question_title: '',
          isVoice: 1,
          option: [
            {
              text: 'over things',
              right: 1
            },
             {
              text: 'under things',
              right: 0
            },
            {
              text: 'on your dad',
              right: 0
            }
          ]
        }
      },
    ]
  }
}