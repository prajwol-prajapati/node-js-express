import Boom from 'boom';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Session from '../models/session';


export function checkLogin(body) {
  return new User().where({
    email: body.email,
    password: body.password
  }).fetch().then(user => {
    if (!user) {
      throw new Boom.notFound('Username or password incorrect');
    }
    console.log(body.email);
    console.log('----------------------------------------------------');
    let refresh_token = jwt.sign({ userId: user.id }, body.email, { expiresIn: 60*20 } );
    let access_token = jwt.sign({ userId: user.id }, 'hello', { expiresIn: 60 } );
    console.log(user.id);
    let myData = {
      token: refresh_token,
      access_token: access_token,
      userId: user.id
    }
    return myData;
  });
}

export function sessionService(body) {
  console.log('----------------------------------------------------');

  console.log(body.myData.userId);
  console.log(body.token);
  return new Session({ user_id: body.myData.userId, refresh_token: body.token, updated_at: new Date()}).save(). then(body => body.refresh());
}

