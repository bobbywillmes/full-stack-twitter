function HandleErrors(err, formType) {
  // loop through given errors to build HTML, insert errors onto page section based on formType
  console.log(`handleErrors() ${formType} ---`)
  console.log(err)
  let errorHtml = ''
  for (const property in err) {
    errorHtml += `
      <div class="alert alert-warning" role="alert">
        <strong>${property}</strong>: ${err[property].join(', ')}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `
  }
  let errorDiv
  if (formType == 'signUp') {
    errorDiv = document.querySelector('#signUpErrors')
  } else if (formType == 'logIn') {
    errorDiv = document.querySelector('#logInErrors')
  }
  errorDiv.innerHTML = errorHtml
}

export default HandleErrors