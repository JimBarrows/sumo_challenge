import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import config, {defaultEnvironment, developmentEnvironment, localEnvironment} from "./config";
import express from "express";
import flash from "connect-flash";
import logger from "morgan";
import mongoose from "mongoose";
import passport from "passport";
import path from "path";
import promise from "bluebird";
import routes from "./routes/index";
import session from "cookie-session";
import {Strategy as LocalStrategy} from "passport-local";

import {Account} from "./models";
import userUi from "./routes/user";
import chat_room from "./routes/chat_room";

const app = express( );

// view engine setup
app.set("views", path.join( __dirname, "views" ));
app.set( "view engine", config.server.viewEngine );

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger( config.server.logLevel ));
app.use(bodyParser.json( ));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser( ));
app.use(session({ keys: config.server.sessionKeys }));
app.use( require( "less-middleware" )(path.join( __dirname, "public" )));
app.use(express.static(path.join( __dirname, "public" )));
app.use(flash( ));

app.use(passport.initialize( ));
app.use(passport.session( ));

// Configure passport-local to use account model for authentication

passport.use(new LocalStrategy(Account.authenticate( )));

passport.serializeUser(Account.serializeUser( ));
passport.deserializeUser(Account.deserializeUser( ));

// Connect mongoose
mongoose.Promise = promise;
mongoose.connect( config.mongoose.url, function( err ) {
	if ( err ) {
		console.log( "Could not connect to mongodb on localhost. Ensure that you have mongodb running on localhost and mongodb accepts connections on standard ports!" );
	}
});

app.use( "/", routes );
app.use( "/user", userUi );
app.use("/api/chat_room", chat_room);

// catch 404 and forward to error handler
app.use( function( req, res, next ) {
	var err = new Error( "Not Found" );
	err.status = 404;
	next( err );
});

// error handlers

// development error handler
// will print stacktrace
if ((config.curentEnvironment === defaultEnvironment( )) || (config.currentEnvironment === localEnvironment( )) || (config.currentEnvironment === developmentEnvironment( ))) {
	app.use( function( err, req, res, next ) {
		res.status( err.status || 500 );
		res.render("error", {
			message: err.message,
			error: err
		});
	});
}

// tag_environment_production error handler
// no stacktraces leaked to user
app.use( function( err, req, res, next ) {
	res.status( err.status || 500 );
	res.render("error", {
		message: err.message,
		error: {}
	});
});

app.listen( config.server.port );
console.log( "Magic happens at http://localhost:" + config.server.port );
module.exports = app;
