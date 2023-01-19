function errorHandling(error, req, res, next) {
  let erorrMessage = {
    code: 500,
    response: { message: `Internal Server Error : ${error}` }
  };

  if (error.name === 'username_empty') {
    res.status(400).json({ message: 'username cannot be empty' });
  }
  else if (error.name === 'email_empty') {
    res.status(400).json({ message: 'email cannot be empty' });
  }
  else if (error.name === 'password_empty') {
    res.status(400).json({ message: 'password cannot be empty' });
  }
  else if (error.name === 'username_unique') {
    res.status(400).json({ message: 'Username must be unique' });
  }
  else if (error.name === 'invalid_username_password') {
    res.status(400).json({ message: 'invalid username/password' });
  }

  else if (error.name === 'Unauthorized Activity') {
    res.status(401).json({ message: `Unauthorized Activity` });

  }

  else if (error.name === 'forbidden to access') {
    res.status(403).json({ message: 'forbidden to access' });
  }

  else if (error.name === 'user_not_found') {
    res.status(404).json({ message: 'username not found' });
  }

  else {
    res.status(erorrMessage.code).json(erorrMessage.response);
  }

}

module.exports = errorHandling;