const firstLevelTask = [
  {
    description: "первый космонавт",
    optionAnswers: ["Титов", "Гагарин", "Терешкова", "Комаров"],
    levelDifficulty: "first level",
    answer: 1
  },
  {
    description: "первый президент",
    optionAnswers: ["Горбачев", "Кучма", "Лукашенко", "Путин"],
    levelDifficulty: "first level",
    answer: 2
  },
  {
    description: "первый герой РБ ",
    optionAnswers: ["Гастелло", "Шойгу", "Маресьев", "Карват"],
    levelDifficulty: "first level",
    answer: 3
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
    this.writeAnswer = 0
    this.falseAnswer = 0
  }

  startProgram(first, last) {
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
  }
  nextQuestion() {
    if (
      this.currentListQuestion[this.currentNumberQuestion] >
      this.currentListQuestion.length - 1
    )
      return
    return this.currentListQuestion[this.currentNumberQuestion++]
  }

  checkCorrectAnswer(collectionInput, nextQuestion) {
    if (collectionInput[nextQuestion.answer].checked) {
      this.answerList.push(true)
      this.writeAnswer++
    } else {
      this.answerList.push(false)
      this.falseAnswer++
    }
  }

  getPercentagesWriteAnswer() {
    const percentages =
      (this.writeAnswer / (this.currentNumberQuestion - 1)) * 100
    return `${this.fullName} дал правильных ответов: ${percentages}%`
  }
}
class View {
  constructor(wrapper) {
    this.wrapper = wrapper
  }

  initial() {
    this.form = document.createElement("form")
    this.form.className = "form"
    this.wrapper.append(this.form)
    this.inputFirstName = document.createElement("input")
    this.inputFirstName.className = "input-first-name"
    this.inputFirstName.value = "Ihar"
    this.form.append(this.inputFirstName)
    this.inputSecondName = document.createElement("input")
    this.inputSecondName.className = "input-second-name"
    this.inputSecondName.value = "Tsykala"
    this.form.append(this.inputSecondName)
    this.button = document.createElement("button")
    this.button.className = "button"
    this.button.innerText = "start"
    this.form.append(this.button)

    this.levelDifficultyTaskBlock = document.createElement("div")
    this.levelDifficultyTaskBlock.className = "difficulty-block"
    this.wrapper.append(this.levelDifficultyTaskBlock)
    this.headDifficulty = document.createElement("h4")
    this.headDifficulty.className = "head-difficulty"
    this.levelDifficultyTaskBlock.append(this.headDifficulty)
    this.headDifficulty.innerText = "Choose the level of difficulty"
    this.selectDifficulty = document.createElement("select")
    this.selectDifficulty.className = "select-difficulty"
    this.levelDifficultyTaskBlock.append(this.selectDifficulty)
    this.firstDifficulty = document.createElement("option")
    this.secondDifficulty = document.createElement("option")
    this.thirdDifficulty = document.createElement("option")
    this.firstDifficulty.className = "first-difficulty"
    this.secondDifficulty.className = "second-difficulty"
    this.thirdDifficulty.className = "thirty-difficulty"
    this.selectDifficulty.append(this.firstDifficulty)
    this.selectDifficulty.append(this.secondDifficulty)
    this.selectDifficulty.append(this.thirdDifficulty)
    this.firstDifficulty.innerText = "first level"
    this.secondDifficulty.innerText = "second level"
    this.thirdDifficulty.innerText = "third level"
  }

  renderQuestion(fullName) {
    this.form.style.display = "none"
    this.levelDifficultyTaskBlock.style.display = "none"
    this.questionBlock = document.createElement("div")
    this.questionBlock.className = "answer-block"
    this.wrapper.append(this.questionBlock)
    this.questionBlock.style.background = "blue"
    this.questionBlock.style.color = "#ffffff"
    this.fullName = document.createElement("p")
    this.questionBlock.append(this.fullName)
    this.fullName.innerHTML = fullName
    this.selectDifficultyRender = document.createElement("p")
    this.questionBlock.append(this.selectDifficultyRender)
    this.selectDifficultyRender.innerHTML = this.selectDifficulty.value
  }

  nextQuestion(nextQuestion) {
    this.renderCurrentQuestion(nextQuestion)
  }

  renderCurrentQuestion(currentQuestion) {
    if (this.currentQuestionBlock) this.currentQuestionBlock.remove()

    this.currentQuestionBlock = document.createElement("div")
    this.currentQuestionBlock.className = "current-question-block"
    this.questionBlock.append(this.currentQuestionBlock)

    this.descriptionQuestion = document.createElement("p")
    this.currentQuestionBlock.append(this.descriptionQuestion)
    this.descriptionQuestion.innerHTML = currentQuestion.description

    this.firstOptionLabel = document.createElement("label")
    this.firstOptionLabel.innerHTML = currentQuestion.optionAnswers[0]
    this.currentQuestionBlock.append(this.firstOptionLabel)
    this.firstOptionInput = document.createElement("input")
    this.firstOptionInput.setAttribute("type", "radio")
    this.firstOptionInput.setAttribute("name", "optionInput")
    this.firstOptionInput.setAttribute("checked", "true")
    this.firstOptionLabel.append(this.firstOptionInput)

    this.secondOptionLabel = document.createElement("label")
    this.secondOptionLabel.innerHTML = currentQuestion.optionAnswers[1]
    this.currentQuestionBlock.append(this.secondOptionLabel)
    this.secondOptionInput = document.createElement("input")
    this.secondOptionInput.setAttribute("type", "radio")
    this.secondOptionInput.setAttribute("name", "optionInput")
    this.secondOptionLabel.append(this.secondOptionInput)

    this.thirdOptionLabel = document.createElement("label")
    this.thirdOptionLabel.innerHTML = currentQuestion.optionAnswers[2]
    this.currentQuestionBlock.append(this.thirdOptionLabel)
    this.thirdOptionInput = document.createElement("input")
    this.thirdOptionInput.setAttribute("type", "radio")
    this.thirdOptionInput.setAttribute("name", "optionInput")
    this.thirdOptionLabel.append(this.thirdOptionInput)

    this.forthOptionLabel = document.createElement("label")
    this.forthOptionLabel.innerHTML = currentQuestion.optionAnswers[3]
    this.currentQuestionBlock.append(this.forthOptionLabel)
    this.forthOptionInput = document.createElement("input")
    this.forthOptionInput.setAttribute("type", "radio")
    this.forthOptionInput.setAttribute("name", "optionInput")
    this.forthOptionLabel.append(this.forthOptionInput)

    this.submitButtonAnswer = document.createElement("button")
    this.submitButtonAnswer.className = "button-submit-answer"
    this.submitButtonAnswer.innerText = "next question"
    this.currentQuestionBlock.append(this.submitButtonAnswer)
  }

  viewPercentagesWriteAnswer(percentages) {
    for (let i = 0; i < this.wrapper.children.length; i++) {
      this.wrapper.children[i].remove()
    }
    this.result = document.createElement("p")
    this.result.innerText = percentages
    this.wrapper.append(this.result)
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

    this.buttonStart = wrapper.querySelector(".button")
    this.buttonStart.addEventListener("click", e => this.startProgram(e))

    this.inputFirstName = wrapper.querySelector(".input-first-name")
    this.inputSecondName = wrapper.querySelector(".input-second-name")

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
        this.model.checkCorrectAnswer(collectionInput, nextQuestion)
        this.nextQuestion()
      })
    } else {
      this.launchLastPage()
    }
  }

  launchLastPage() {
    const percentages = this.model.getPercentagesWriteAnswer()
    this.view.viewPercentagesWriteAnswer(percentages)
  }
}

const wrapper = document.getElementById("wrapper")

const view = new View(wrapper)
const model = new Model(firstLevelTask)
const controller = new Controller(view, model, wrapper)

controller.initial()
