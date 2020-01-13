const firstLevelTask = [
  {
    description: "первый космонавт",
    optionAnswers: ["Титов", "Гагарин", "Терешкова", "Комаров"],
    levelDifficulty: "first level",
    answer: "Гагарин"
  },
  {
    description: "первый президент",
    optionAnswers: ["Горбачев", "Кучма", "Лукашенко", "Путин"],
    levelDifficulty: "second level",
    answer: "Лукашенко"
  },
  {
    description: "первый герой РБ ",
    optionAnswers: ["Гастелло", "Шойгу", "Маресьев", "Карват"],
    levelDifficulty: "third level",
    answer: "Карват"
  },
  {
    description:
      "Как правильно закончить пословицу: «Не откладывай на завтра то, что можно…»?",
    optionAnswers: [
      "сделать сегодня",
      "сделать послезавтра",
      "сделать через месяц",
      "никогда не делать"
    ],
    levelDifficulty: "first level",
    answer: "сделать сегодня"
  },
  {
    description: "Что говорит человек, когда замечает нечто необычное?",
    optionAnswers: [
      "попало в лоб",
      "залетело в рот",
      "накапало в уши",
      "бросилось в глаза"
    ],
    levelDifficulty: "first level",
    answer: "бросилось в глаза"
  },
  {
    description: "Что помогает туристу ориентироваться в незнакомом городе?",
    optionAnswers: [
      "путепровод",
      "путеукладчик",
      "путеводитель",
      "путеводная звезда"
    ],
    levelDifficulty: "first level",
    answer: "путеводитель"
  },

  {
    description: "Какой наряд прославил баснописец Крылов?",
    optionAnswers: [
      "тришкин кафтан",
      "ивашкин армяк",
      "прошкин зипун",
      "машкин сарафан"
    ],
    levelDifficulty: "second level",
    answer: "тришкин кафтан"
  },
  {
    description: "Как звали старшую сестру императора Петра Первого?",
    optionAnswers: ["Вера", "Надежда", "Любовь", "Софья"],
    levelDifficulty: "second level",
    answer: "Софья"
  },
  {
    description: "Что не бывает морским?",
    optionAnswers: ["рельс", "огурец", "гребешок", "узел"],
    levelDifficulty: "second level",
    answer: "рельс"
  },
  {
    description: "Кого с большим основанием можно назвать островитянами?",
    optionAnswers: ["алеутов", "эвенков", "чукчей", "якутов"],
    levelDifficulty: "third level",
    answer: "алеутов"
  },
  {
    description: "В какой стране появилась мандолина?",
    optionAnswers: ["Испания", "Италия", "Венгрия", "Греция"],
    levelDifficulty: "third level",
    answer: "Италия"
  },
  {
    description:
      "Какой врач первым в истории русской медицины применил гипсовую повязку?",
    optionAnswers: ["Субботин", "Пирогов", "Боткин", "Склифосовский"],
    levelDifficulty: "third level",
    answer: "Пирогов"
  }
]
// class Person {
//     constructor(firstName, secondName) {
//         this.firstName = firstName;
//         this.secondName = secondName;
//     }
// }
class Model {
  constructor(arrTask) {
    this.arrTask = arrTask
    this.currentNumberQuestion = 0
    this.answerList = []
    this.amoundTrueAnswer = 0
    this.amoundFalseAnswer = 0
    this.currentWriteAnswerIndex = 0
  }

  startProgram(first, last) {
    console.log(this)
    const fullName = `${first} ${last}`
    this.fullName = fullName
    return fullName
  }

  searchCurrentQuestion(levelDifficulty) {
    this.currentListQuestion = []
    this.arrTask.forEach(obj => {
      if (obj.levelDifficulty === levelDifficulty) {
        this.currentListQuestion.push(obj)
      }
    })
    this.currentListQuestion = this.getRandom(this.currentListQuestion)
  }

  nextQuestion() {
    if (this.currentNumberQuestion > this.currentListQuestion.length - 1) return

    const currentQuestion = Object.assign(
      {},
      this.currentListQuestion[this.currentNumberQuestion++]
    )

    currentQuestion.optionAnswers = this.getRandom(
      currentQuestion.optionAnswers
    )

    this.rememderWriteIndex(currentQuestion)

    return currentQuestion
  }

  rememderWriteIndex(currentQuestion) {
    currentQuestion.optionAnswers.forEach((item, index) => {
      if (item === currentQuestion.answer) {
        this.currentWriteAnswerIndex = index
      }
    })
  }

  getRandom(arr) {
    const dup = arr.slice()
    const result = []
    while (dup.length) {
      result.push(dup.splice(Math.round(Math.random() * dup.length - 1), 1))
    }
    return result.map(item => item[0])
  }

  checkCorrectAnswer(collectionInput) {
    if (collectionInput[this.currentWriteAnswerIndex].checked) {
      this.answerList.push(true)
      this.amoundTrueAnswer++
    } else {
      this.answerList.push(false)
      this.amoundFalseAnswer++
    }
  }

  getPercentagesWriteAnswer() {
    const percentages = Math.round(
      (this.amoundTrueAnswer / this.currentNumberQuestion) * 100
    )
    return `${this.fullName} дал правильных ответов: ${percentages}%`
  }

  clearConstructor() {
    this.currentNumberQuestion = 0
    this.answerList = []
    this.amoundTrueAnswer = 0
    this.amoundFalseAnswer = 0
    this.currentWriteAnswerIndex = 0
  }
}
class View {
  constructor(wrapper) {
    this.wrapper = wrapper
    this.fullNameBegin = {
      "first-name": "Ihar",
      "last-name": "Tsykala"
    }    
  }

  initial() {
    this.clearPage()

    this.createStartForm = this.createElement('form','form', '')
    this.wrapper.append(this.createStartForm)

    const arrNameKeys = Object.keys(this.fullNameBegin)
    arrNameKeys.forEach(item => {
      const input = document.createElement("input")
      input.className = `input-${item}`
      input.value = this.fullNameBegin[item]
      this.createStartForm.append(input)
    })

    const startButton = this.createElement('button','button-start', 'start')    
    this.createStartForm.append(startButton)

    this.levelDifficultyTaskBlock = this.createElement('div','difficulty-block', '')     
    this.wrapper.append(this.levelDifficultyTaskBlock)

    const headDifficulty = this.createElement('h4','head-difficulty', 'Choose the level of difficulty') 
    this.levelDifficultyTaskBlock.append(headDifficulty)   

   this. selectDifficulty = this.createElement('select','select-difficulty', '')   
    this.levelDifficultyTaskBlock.append(this.selectDifficulty)

    const arrLevelsDifficulty = ["first", "second", "third"]
    arrLevelsDifficulty.forEach(item => {
      const option = this.createElement("option", `${item}-difficulty`, `${item} level`)       
      this.selectDifficulty.append(option)
    })
  }

  createElement(elementName, className, innerText) {
    const element = document.createElement(elementName)
    element.className = className
    element.innerText = innerText
    return element
  }

  clearPage() {
    if (this.wrapper.children.length) {
        for (let i = 0; i < this.wrapper.children.length; i++) {
          this.wrapper.children[i].remove()
          i--
        }
    }
  }

  renderQuestion(fullName) {
    this.clearPage()

    this.questionBlock = this.createElement("div", 'answer-block', '')    
    this.questionBlock.style.background = "blue"
    this.questionBlock.style.color = "#ffffff"
    this.wrapper.append(this.questionBlock)

    const levelForName = [fullName, this.selectDifficulty.value]
    levelForName.forEach(item => {
      const p = document.createElement("p")
      p.innerText = item
      this.questionBlock.append(p)
    })
  }

  nextQuestion(nextQuestion) {
    this.renderCurrentQuestion(nextQuestion)
  }

  renderCurrentQuestion(currentQuestion) {
    if (this.currentQuestionBlock) this.currentQuestionBlock.remove()

    this.currentQuestionBlock = this.createElement("div",'current-question-block', '')
    this.questionBlock.append(this.currentQuestionBlock)
    
    const descriptionQuestion = this.createElement("p", '', currentQuestion.description)
    this.currentQuestionBlock.append(descriptionQuestion)    

    const arrOptionQuestion = ["first", "second", "third", "fourth"]
    arrOptionQuestion.forEach((item, index) => {
      const label = this.createElement("label", `${item}-label-question`, currentQuestion.optionAnswers[index])    
      this.currentQuestionBlock.append(label)
      const input = this.createElement("input", '', '')
      input.setAttribute("type", "radio")
      input.setAttribute("name", "optionInput")
      // input.setAttribute("checked", "true")
      label.append(input)
    })

    const nextQuestionButton = this.createElement('button','button-submit-answer', 'next question')
    this.currentQuestionBlock.append(nextQuestionButton)    
  }

  viewPercentagesWriteAnswer(percentages) {
    this.clearPage()

    this.result = this.createElement("p",'',percentages)    
    this.wrapper.append(this.result)

    const restartButton = this.createElement('button','button-restart', 'restart')
    this.wrapper.append(restartButton)
  }  
}

class Controller {
  constructor(view, model, wrapper) {
    this.view = view
    this.model = model
    this.wrapper = wrapper
  }

  initial() {    
    this.view.initial()

    this.buttonStart = wrapper.querySelector(".button-start")
    this.buttonStart.addEventListener("click", e => this.startProgram(e))

    this.inputFirstName = wrapper.querySelector(".input-first-name")
    this.inputSecondName = wrapper.querySelector(".input-last-name")

    this.selectDifficulty = wrapper.querySelector(".select-difficulty")
  }

  startProgram(e) {
    e.preventDefault()
    const fullName = this.model.startProgram(
      this.inputFirstName.value,
      this.inputSecondName.value
    )    
    this.model.searchCurrentQuestion(this.selectDifficulty.value)
    this.view.renderQuestion(fullName)
    this.nextQuestion()
  }

  nextQuestion() {
    const nextQuestion = this.model.nextQuestion()
    if (nextQuestion) {
      this.view.nextQuestion(nextQuestion)
      this.submitButtonAnswer = wrapper.querySelector(".button-submit-answer")
      this.submitButtonAnswer.addEventListener("click", e => {
        this.currentQuestionBlock = wrapper.querySelector(
          ".current-question-block"
        )        
        const collectionInput = this.currentQuestionBlock.querySelectorAll(
          "input"
        )
        this.model.checkCorrectAnswer(collectionInput)
        this.nextQuestion()
      })
    } else {
      this.launchLastPage()
    }
  }

  launchLastPage() {
    const percentages = this.model.getPercentagesWriteAnswer()
    this.view.viewPercentagesWriteAnswer(percentages)
    this.restartButton = wrapper.querySelector(".button-restart")
    this.restartButton.addEventListener("click", e => {
      this.model.clearConstructor()
      this.initial()
    })
  }
}

const wrapper = document.getElementById("wrapper")

const view = new View(wrapper)
const model = new Model(firstLevelTask)
const controller = new Controller(view, model, wrapper)

controller.initial()
