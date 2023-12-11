from flask import Flask,render_template,request,redirect
from models import db,filmModel
import os
 
def create_app():
    app = Flask(__name__)


    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
    db.init_app(app)


    # @app.before_request
    # def create_table():
    #     db.create_all()


    # @app.route('/create' , methods = ['GET','POST'])
    # def create():
    #     if request.method == 'GET':
    #         return render_template('create.html')
        
    #     if request.method == 'POST':
    #         title = request.form['title']
    #         yearReleased = request.form['yearReleased']
    #         rating = request.form['rating']
    #         duration = request.form['duration']
    #         genre = request.form['genre']

    #         films = filmModel(
    #             title=title,
    #             yearReleased=yearReleased,
    #             rating=rating,
    #             duration=duration, 
    #             genre=genre,
    #         )
    #         db.session.add(films)
    #         db.session.commit()
    #         return redirect('/')


    @app.route('/' , methods = ['GET'])
    def RetrieveList():
        films = filmModel.query.all()
        return render_template('index.html',films = films)


    #  Delete film by filmID
    @app.route('/<int:filmID>/delete', methods=['GET','POST'])
    def delete(filmID):
        films = filmModel.query.filter_by(filmID=filmID).first()
        if request.method == 'POST':
            if films:
                db.session.delete(films)
                db.session.commit()
                return redirect('/')
                abort(404)
        #return redirect('/')
        return render_template('delete.html')


    # Edit film by filmID #
    @app.route('/<int:filmID>/edit',methods = ['GET','POST'])
    def update(filmID):
        film = filmModel.query.filter_by(filmID=filmID).first()

        if request.method == 'POST':
            if film:
                db.session.delete(film)
                db.session.commit()

            # Fill data into the form  
                title = request.form['title']
                yearReleased = request.form['yearReleased']
                rating = request.form['rating']
                duration = request.form['duration']
                genre = request.form['genre']

            film = filmModel(
                title=title,
                yearReleased=yearReleased,
                rating=rating,
                duration=duration,
                genre=genre, 
            )
            db.session.add(film)
            db.session.commit()
            return redirect('/')
            return f"The Film ID = {id} Does nit exist"

        return render_template('update.html', film = film)
    return app