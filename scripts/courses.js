var courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    completed: true
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    completed: true
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    completed: false
  }
];

var courseCardsContainer = document.getElementById('course-cards');
var creditTotal = document.getElementById('credit-total');
var filterButtons = document.getElementsByClassName('filter-btn');

function showCourses(courseList) {
  courseCardsContainer.innerHTML = '';

  for (var i = 0; i < courseList.length; i++) {
    var course = courseList[i];

    var card = document.createElement('div');
    card.className = 'course-card';
    if (course.completed) {
      card.className = 'course-card completed';
    }

    card.innerHTML =
      '<p class="subject-number">' + course.subject + ' ' + course.number + '</p>' +
      '<p>' + course.title + '</p>' +
      '<p>' + course.credits + ' credits</p>';

    courseCardsContainer.appendChild(card);
  }

  var totalCredits = courseList.reduce(function (sum, course) {
    return sum + course.credits;
  }, 0);

  creditTotal.textContent = 'Total Credits: ' + totalCredits;
}

function filterCourses(subject) {
  if (subject === 'all') {
    showCourses(courses);
    return;
  }

  var filtered = [];
  for (var i = 0; i < courses.length; i++) {
    if (courses[i].subject === subject) {
      filtered.push(courses[i]);
    }
  }
  showCourses(filtered);
}

for (var i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener('click', function (event) {
    filterCourses(event.target.dataset.filter);
  });
}

showCourses(courses);
