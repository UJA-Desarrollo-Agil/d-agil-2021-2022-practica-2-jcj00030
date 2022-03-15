// ---------------------------------------------------------------------------
// Edit this file to define your game. It should have at least four
// sets of content: undum.game.situations, undum.game.start,
// undum.game.qualities, and undum.game.init.
// ---------------------------------------------------------------------------

/* A unique id for your game. This is never displayed. I use a UUID,
 * but you can use anything that is guaranteed unique (a URL you own,
 * or a variation on your email address, for example). */
undum.game.id = "be1c95b9-cbc7-48c6-8e6a-89837aa9113e";

/* A string indicating what version of the game this is. Versions are
 * used to control saved-games. If you change the content of a game,
 * the saved games are unlikely to work. Changing this version number
 * prevents Undum from trying to load the saved-game and crashing. */
undum.game.version = "1.0";

/* A variable that changes the fade out speed of the option text on
 * a mobile. */
undum.game.mobileHide = 2000

/* A variable that changes the options fade out speed. */
undum.game.fadeSpeed = 1500

/* A variable that changes the slide up speed after clicking on an
 * option. */
undum.game.slideUpSpeed = 500

/* The situations that the game can be in. Each has a unique ID. */
undum.game.situations = {
    start: new undum.SimpleSituation(
        "<h1>Comienzo</h1>\
        <img src='media/games/tutorial/woodcut1.png' class='float_right'>\
        <p>Era un viernes por la noche cuando llegaba uno de los momentos mas esperados de tu vida , habías acabado la carrera y te iban\
          a dar el titulo universitario . Estabas muy nervioso e ilusionado , pero a la vez con un poco de miedo de que iba a pasar\
          en tu nueva etapa como ingeniero informático. Te dan el titulo y después de un viernes de fiesta , el sábado con una resaca mortal\
          decides que hacer con tu vida , o echar curriculum y </p>\
        \
        <p class='transient'><a href='empresa'>trabajar para una empresa\
        </a> o <a href='apropia'> hacer una aplicación tu mismo\
        </a> </p>",
    ),

    // NB: The 'hub' situation which is the main list of topics, is
    // defined wholly in the HTML file, and doesn't have an entry in
    // the game.situations dictionary in this file.

    // For variety, here we define a situation using the top-level
    // Situation type. This is a neat approach to generate text by
    // looking it up in the HTML document. For static text that makes
    // more sense than writing it longhand.
    situations: new undum.Situation({
        enter: function(character, system, from) {
            system.write($("#s_situations").html());
        },
        tags: ["topic"],
        optionText: "Decicimos colocarnos en una empresa",
        displayOrder: 1
    }),
	empresa: new undum.SimpleSituation(
        "<h1>Trabajas en una empresa</h1>\
		<img src='media/games/tutorial/woodcut2.png' class='float_right'>\
		<p>En la empresa trabajas 2 años aprendiendo mucho pero aguantando todo tipo de jefes y algunos días incluso con resaca mortal.No te gusta ser mandado por ningún jefe , ya que propones siempre ideas diferentes y nadie te hace caso porque te tienes que adaptar a lo que piden.\
		Pero a pesar de todo lo pasado adquieres una gran experiencia por lo que\
			decides invertir tus ahorros de esos años en la empresa y <a href='todo'>hacer dos aplicaciones útiles</a></p>",
		{
			enter: function(character, system, to) {
                system.setQuality("ahorros", character.qualities.ahorros+10000);
				system.setQuality("experiencia", character.qualities.experiencia+50);
            }
		}
        
    ),
	apropia: new undum.SimpleSituation(
        "<h1>Hacer aplicacion con amigos</h1>\
		<img src='media/games/tutorial/foto5.jpg' class='center-block'>\
		<p>Le propones la idea de trabajar juntos y hacer una apliación de ropa a tus amigos y deciden aceptarla poniendo cada uno 1500€ iniciales , aunque no teneis experencia la empresa parece dar el BOOM y \
		estallar en la industria de compra-venta online . Al ver este éxito entre todos decidís <a href='ibiza'>ir a celebrarlo a Ibiza</a> o <a href='duro'>seguir trabajando duro</a>.\
		</p>",
		{
			enter: function(character, system, to) {
                system.setQuality("ahorros", character.qualities.ahorros-1500);
            }
		}
        
    ),
	ibiza: new undum.SimpleSituation(
        "<h1>Fiesta en Ibiza</h1>\
		<img src='media/games/tutorial/foto6.jpg' class='center-block'>\
		<p>Debido a que en Ibiza pasais la mejor fiesta de vuestra vida , donde conoceis a Laporta que estaba allí \
		porque el Barça acaba ganando la liga, os gastais todo el dinero y los fondos de la empresa y esta se va a la ruina , pero mereció la pena porque lo pasais muy bien \
		, por lo cual decides <a href='empresa'>ir a una empresa</a></p>",
		{
			enter: function(character, system, to) {
                system.setQuality("ahorros", character.qualities.ahorros-1500);
            }
		}
        
    ),
	duro: new undum.SimpleSituation(
        "<p>Parece que la aplicación marcha bien pero debido a que todos los que estais en ella teneis muy poca experiencia , empiezan a surgir problemas tanto en el ámbito de trabajo \
		como en los personales entre unos y otros . Al ser todos amigos y para no quedar mal entre vosotros decides marcharte de la empresa de tus amigos y <a href='empresa'>ir a otra empresa</a></p>",
		{
			enter: function(character, system, to) {
                system.setQuality("experiencia", character.qualities.experiencia+15);
            }
		}
        
    ),
    todo: new undum.SimpleSituation(
        "<h1>Decides ser tu propio jefe</h1>\
		<img src='media/games/tutorial/foto1.jpg' class='float_right'>\
		<p>Desde hace mucho tiempo tienes muchas ganas de hacer una apliación para organizar monterías y cacerías , debido al cariño que le tienes a este deporte\
			tambien haces una aplicación para organizar botellones , debido a tu cariño por el Ron-Cola.Decides <a href='buenas'>ponerte en serio con esos dos proyectos</a></p>",
		{
			enter: function(character, system, to) {
                system.setQuality("ahorros", character.qualities.ahorros-5500);
            }
		}
        
    ),
	buenas: new undum.SimpleSituation(
        "<p>La aplicación de botellones tiene bastante proyección y puede llegar a tener éxito incluso la llegan a valorar en 1 millón , pero la aplicación de la caza no llega a ir del todo bien \
		aunque la utilizaban unos pocos usuarios . Al ver estas dos situaciones decides <a href='buenas2'>poner la aplicación de caza en venta</a> y centrarte en la otra </p>",
		{
			exit: function(character, system, to) {
                system.setQuality("suerte", character.qualities.suerte+2);
				system.setQuality("experiencia", character.qualities.experiencia+10);
            }
		}
        
    ),
	buenas2: new undum.SimpleSituation(
        "<img src='media/games/tutorial/foto2.png' class='center-block'>\
		<p>Sorprendentemente la Junta de Andalucía ofrece 3 millones de euros por la aplicación , ya que era utilizaba para organizar cacerías ilegales. \
		 El seprona pidió que se hiciera esa inversión para pillar a todas las cuadrillas y furtivos que se comunicaban a través de la aplicación. Por estos motivos decides <a href='buenas3'>venderla</a> </p>",
		 {
			exit: function(character, system, to) {
                system.setQuality("ahorros", character.qualities.ahorros+3000000);
            }
		}
        
    ),
	buenas3: new undum.SimpleSituation(
        "<p>La Junta de Andalucía esta encantada con tu venta de la aplicación , ya que a los pocos días ya pillaron a grupos ilegales. Cuando te ingresan 3 millones \
		 te ves con bastante dinero en tu cuenta y te planteas dos cosas : <a href='buenas4'>vender la aplicación de botellones</a> ya que te daban 1 millón por ella  o <a href='buenas5'>seguir trabajando en ella</a> </p>",
        
    ),
	buenas4: new undum.SimpleSituation(
        "<img src='media/games/tutorial/foto3.jpg' class='center-block'>\
		<p>Decides vender tu aplicación de botellones por el millón que te daban sin trabajar más en ella, aunque tenía mucha proyección para llegar a ser \
			una aplicación bastante más cara . Después de venderla , te ves con 4 millones de euros en tu cuenta y decides no trabajar mas , y vivir una gran \
			vida a base de esa fortuna por muchos años</p>",
		{
			enter: function(character, system, to) {
                system.setQuality("ahorros", character.qualities.ahorros+1000000);
            }
		}
        
    ),
	buenas5: new undum.SimpleSituation(
        "<img src='media/games/tutorial/foto4.jpg' class='float_right'>\
		<p>Decides seguir trabajando muy duro en la aplicación , pero al ser jefe tienes demasiadas responsabilidades y eso te quema ya que no sabes administrarlas \
			lo mejor posible. Tambien influye que al crecer la apliacion necesitas más personal , y empiezan a surgir problemas entre ellos . Debido a todos los factores \
			anteriores decides vender la aplicación y vivir con lo que ya tienes y lo que te den . Finalmenete vendes la apliacion por 2 millones , pero debido al agobio \
			se te cae el pelo y vas a ponerte pelo a Turquía , y a vivir sin trabajar toda tu vida junto con tu pelo nuevo y tus 5 millones</p>",
		{
			enter: function(character, system, to) {
                system.setQuality("ahorros", character.qualities.ahorros+1700000);
            }
		}
        
    )
};

// ---------------------------------------------------------------------------
/* The Id of the starting situation. */
undum.game.start = "start";

// ---------------------------------------------------------------------------
/* Here we define all the qualities that our characters could
 * possess. We don't have to be exhaustive, but if we miss one out then
 * that quality will never show up in the character bar in the UI. */
undum.game.qualities = {
    ahorros: new undum.IntegerQuality(
        "ahorros", {priority:"0001", group:'stats'}
    ),
	experiencia: new undum.NumericQuality(
        "experiencia", {priority:"0002", group:'stats'}
    ),
    suerte: new undum.FudgeAdjectivesQuality( // Fudge as in the FUDGE RPG
        "<span title='Skill, Stamina and Luck are reverently borrowed from the Fighting Fantasy series of gamebooks. The words representing Luck are from the FUDGE RPG. This tooltip is illustrating that you can use any HTML in the label for a quality (in this case a span containing a title attribute).'>suerte</span>",
        {priority:"0003", group:'stats'}
    )
};

// ---------------------------------------------------------------------------
/* The qualities are displayed in groups in the character bar. This
 * determines the groups, their heading (which can be null for no
 * heading) and ordering. QualityDefinitions without a group appear at
 * the end. It is an error to have a quality definition belong to a
 * non-existent group. */
undum.game.qualityGroups = {
    stats: new undum.QualityGroup(null, {priority:"0001"}),
    progress: new undum.QualityGroup('Progress', {priority:"0002"})
};

// ---------------------------------------------------------------------------
/* This function gets run before the game begins. It is normally used
 * to configure the character at the start of play. */
undum.game.init = function(character, system) {
    character.qualities.ahorros = 3000;
	character.qualities.experiencia=10; //puntuaremos la experiencia de 0 a 100
    character.qualities.suerte = 1;
    system.setCharacterText("<p>Estos atributos serán las cualidades que tiene el personaje en distintas situaciones de la historia</p>");
};
