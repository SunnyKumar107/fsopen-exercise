describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user1)

    const user2 = {
      name: 'Jack Sparow',
      username: 'jacksparow',
      password: 'jcksprw',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user2)

    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application').get('#username').get('#password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username')
        .type('mluukkai')
        .get('#password')
        .type('salainen')
        .get('#login_btn')
        .click()

      cy.contains('Matti Luukkainen logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username')
        .type('mluukkai')
        .get('#password')
        .type('wrong')
        .get('#login_btn')
        .click()

      // cy.get('.msg').contains('Wrong username or password!')
      cy.get('.msg').should('contain', 'Wrong username or password!')

      // cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
      cy.contains('Matti Luukkainen logged in').should('not.exist')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('a blog can be created', function () {
      cy.contains('Create new blog').click()
      cy.get('#title').type('Go To Statement Considered Harmful')
      cy.get('#author').type('Edsger W. Dijkstra')
      cy.get('#url').type(
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
      )
      cy.get('#create_blog_btn').click()
      cy.contains('Go To Statement Considered Harmful')
    })
  })

  describe('when log in  user can be like', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      })
    })

    it('blog can be liked', function () {
      cy.get('#show_detail_btn').click()
      cy.get('#like_btn').click()
    })
  })

  describe('only the creator can see the remove button of blog and also remove the blog', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({
        title: 'Go To Statement Considered Harmful.',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      })

      cy.login({ username: 'jacksparow', password: 'jcksprw' })
      cy.createBlog({
        title: 'The pratical test pyramid.',
        author: 'Ham Vocke',
        url: 'https://overreacted.io/on-let-vs-const',
      })
    })

    it('blog can be deleted', function () {
      cy.contains('Go To Statement Considered Harmful.')
        .parent()
        .find('button')
        .should('contain', 'View')
        .click()
      cy.contains('Go To Statement Considered Harmful.')
        .parent()
        .find('button')
        .should('not.contain', 'Remove')

      cy.contains('The pratical test pyramid.')
        .parent()
        .find('button')
        .should('contain', 'View')
        .click()
      cy.contains('The pratical test pyramid.')
        .parent()
        .find('button')
        .should('contain', 'Remove')
      // .click()
      cy.get('#remove_blog_btn').click()
    })
  })

  describe('blogs are ordered by likes', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({
        title: 'The title with the second most likes',
        author: 'Random Author2',
        url: 'https://site2.com',
      })
      cy.createBlog({
        title: 'The title with the most likes',
        author: 'Random Author1',
        url: 'https://site1.com',
        likes: '10',
      })
    })

    it('most liked blog being first', function () {
      cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
      cy.get('.blog')
        .eq(1)
        .should('contain', 'The title with the second most likes')
    })
  })
})
