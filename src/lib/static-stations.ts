// Comprehensive list of French railway stations for static generation
export const ALL_FRENCH_STATIONS = [
  // Major Paris stations
  'paris-gare-du-nord', 'paris-gare-de-lyon', 'paris-montparnasse', 'paris-saint-lazare', 
  'paris-gare-de-l-est', 'paris-gare-d-austerlitz', 'paris-bercy', 'paris-invalides',
  
  // Major regional hubs
  'lyon-part-dieu', 'lyon-perrache', 'marseille-saint-charles', 'lille-europe', 'lille-flandres',
  'bordeaux-saint-jean', 'toulouse-matabiau', 'strasbourg', 'nantes', 'rennes', 'nice-ville', 
  'montpellier-saint-roch', 'nancy-ville', 'metz-ville', 'reims', 'dijon-ville',
  
  // TGV stations
  'aix-en-provence-tgv', 'avignon-tgv', 'valence-alixan-tgv', 'besancon-franche-comte-tgv',
  'belfort-montbeliard-tgv', 'macon-loche-tgv', 'vendome-villiers-sur-loir-tgv',
  'champagne-ardenne-tgv', 'lorraine-tgv', 'meuse-tgv',
  
  // Regional capitals
  'amiens', 'caen', 'rouen-rive-droite', 'orleans', 'tours', 'poitiers', 'limoges-benedictins',
  'clermont-ferrand', 'le-mans', 'angers-saint-laud', 'bourges', 'nevers', 'moulins-sur-allier',
  'vichy', 'montargis', 'troyes', 'chalons-en-champagne', 'charleville-mezieres', 'sedan',
  'epernay', 'vitry-le-francois', 'saint-dizier', 'chaumont', 'langres', 'vesoul', 'belfort',
  'montbeliard', 'pontarlier', 'dole-ville', 'lons-le-saunier', 'saint-claude', 'oyonnax',
  'bourg-en-bresse', 'macon-ville', 'chalon-sur-saone', 'le-creusot-montceau-les-mines',
  'autun', 'avallon', 'auxerre', 'sens', 'joigny', 'laroche-migennes',
  
  // Alps and mountain stations
  'grenoble', 'chambery-challes-les-eaux', 'aix-les-bains-le-revard', 'annecy', 'thonon-les-bains',
  'evian-les-bains', 'chamonix-mont-blanc', 'saint-gervais-les-bains-le-fayet', 'albertville',
  'bourg-saint-maurice', 'modane', 'briancon', 'embrun', 'gap', 'sisteron', 'digne-les-bains',
  'manosque-gréoux-les-bains', 'culoz', 'bellegarde', 'divonne-les-bains', 'ferney-voltaire',
  
  // Mediterranean coast
  'toulon', 'hyeres', 'saint-raphael-valescure', 'frejus-saint-raphael', 'cannes', 'antibes',
  'nice-riquier', 'beaulieu-sur-mer', 'monaco-monte-carlo', 'menton', 'ventimiglia',
  'bandol', 'sanary-sur-mer', 'la-ciotat', 'cassis', 'aubagne', 'marseille-blancarde',
  'marseille-saint-marcel', 'vitrolles-aeroport-marseille-provence', 'miramas', 'salon-de-provence',
  'arles', 'tarascon', 'beaucaire', 'nimes', 'ales', 'la-grand-combe', 'millau', 'beziers',
  'agde', 'sete', 'montpellier-sud-de-france', 'lunel', 'narbonne', 'leucate-la-franqui',
  'perpignan', 'collioure', 'cerbere', 'port-bou', 'figueres',
  
  // Southwest
  'pau', 'tarbes', 'lourdes', 'bayonne', 'biarritz', 'saint-jean-de-luz-ciboure', 'hendaye',
  'dax', 'mont-de-marsan', 'agen', 'villeneuve-sur-lot', 'marmande', 'tonneins', 'perigueux',
  'bergerac', 'sarlat-la-caneda', 'brive-la-gaillarde', 'tulle', 'ussel', 'saint-yrieix-la-perche',
  'angouleme', 'cognac', 'saintes', 'royan', 'la-rochelle-ville', 'rochefort', 'surgeres',
  'niort', 'bressuire', 'parthenay', 'thouars', 'loudun', 'chatellerault', 'montmorillon',
  'bellac', 'saint-junien', 'confolens', 'ruffec', 'chef-boutonne', 'melle',
  
  // West and Loire Valley
  'cholet', 'saumur', 'chinon', 'loches', 'chateauroux', 'issoudun', 'vierzon', 'romorantin-lanthenay',
  'vendome', 'blois-chambord', 'saint-pierre-des-corps', 'amboise', 'saint-aignan-noyers',
  'montoire-sur-le-loir', 'chateau-du-loir', 'la-fleche', 'sable-sur-sarthe', 'la-suze-sur-sarthe',
  'connerre-beille', 'bonneval', 'chateaudun', 'nogent-le-rotrou', 'mortagne-au-perche',
  'l-aigle', 'verneuil-sur-avre', 'dreux', 'chartres', 'maintenon', 'epernon', 'rambouillet',
  
  // Brittany
  'quimper', 'brest', 'morlaix', 'lannion', 'guingamp', 'saint-brieuc', 'lamballe', 'dinan',
  'dol-de-bretagne', 'saint-malo', 'cancale', 'pontorson-mont-saint-michel', 'avranches',
  'granville', 'coutances', 'saint-lo', 'bayeux', 'carentan', 'valognes', 'cherbourg-en-cotentin',
  'lorient', 'quimperlé', 'concarneau', 'pont-aven', 'douarnenez', 'chateaulin', 'carhaix',
  'loudéac', 'ploërmel', 'joselin', 'vannes', 'auray', 'carnac', 'quiberon', 'belle-ile-en-mer',
  'pontivy', 'questembert', 'muzillac', 'redon', 'saint-nazaire', 'pornichet', 'la-baule-escoublac',
  'le-croisic', 'guerande', 'savenay', 'nort-sur-erdre', 'chateaubriant', 'segre',
  
  // Normandy
  'lisieux', 'pont-l-eveque', 'honfleur', 'deauville-trouville', 'cabourg-dives-sur-mer',
  'caen-ouistreham', 'courseulles-sur-mer', 'arromanches', 'port-en-bessin', 'isigny-sur-mer',
  'lison', 'saint-pierre-du-mont', 'coutances', 'folligny', 'villedieu-les-poeles', 'vire',
  'conde-sur-noireau', 'flers', 'tinchebray', 'domfront', 'bagnoles-de-l-orne', 'sees',
  'alencon', 'mamers', 'la-ferte-bernard', 'evreux-normandie', 'vernon-giverny', 'mantes-la-jolie',
  'conflans-sainte-honorine', 'poissy', 'saint-germain-en-laye', 'le-vesinet-le-pecq',
  'chatou-croissy', 'rueil-malmaison', 'nanterre-universite', 'courbevoie', 'la-defense',
  'neuilly-porte-maillot', 'levallois-perret', 'clichy-levallois', 'saint-ouen', 'saint-denis',
  
  // North and Picardy
  'valenciennes', 'denain', 'douai', 'arras', 'bethune', 'lens', 'lievin', 'henin-beaumont',
  'libercourt', 'ostricourt', 'orchies', 'templeuve', 'tournai', 'mouscron', 'roubaix',
  'tourcoing', 'armentieres', 'bailleul', 'hazebrouck', 'saint-omer', 'calais-ville',
  'calais-frethun', 'boulogne-ville', 'etaples-le-touquet', 'rang-du-fliers-verton',
  'berck-sur-mer', 'fort-mahon-plage', 'rue', 'noyelles-sur-mer', 'saint-valery-sur-somme',
  'le-crotoy', 'abbeville', 'longpre-les-corps-saints', 'hangest-sur-somme', 'picquigny',
  'flixecourt', 'pont-remy', 'longueau', 'corbie', 'albert', 'achiet', 'bapaume', 'cambrai',
  'marcoing', 'bantouzelle', 'le-cateau-cambresis', 'busigny', 'saint-quentin', 'tergnier',
  'chauny', 'noyon', 'compiegne', 'creil', 'senlis', 'chantilly-gouvieux', 'orry-la-ville-coye',
  'la-borne-blanche', 'survilliers-fosses', 'louvres', 'goussainville', 'villiers-le-bel-gonesse-arnouville',
  'garges-sarcelles', 'pierrefitte-stains', 'saint-denis-universite', 'la-plaine-stade-de-france',
  'saint-ouen-l-aumone', 'pontoise', 'cergy-le-haut', 'cergy-saint-christophe', 'cergy-prefecture',
  
  // Champagne-Ardenne
  'soissons', 'château-thierry', 'dormans', 'epernay', 'ay-champagne', 'avenay-val-d-or',
  'rilly-la-montagne', 'sillery', 'bezannes', 'fismes', 'bazoches', 'fere-en-tardenois',
  'neuilly-saint-front', 'oulchy-breny', 'villers-cotterets', 'crépy-en-valois', 'nanteuil-le-haudouin',
  'meaux', 'trilport', 'changis-saint-jean', 'la-ferte-sous-jouarre', 'coulommiers', 'mouroux',
  'faremoutiers', 'jouy-le-chatel', 'rozay-en-brie', 'longueville', 'montereau-fault-yonne',
  'saint-mammes', 'moret-veneux-les-sablons', 'thomery', 'fontainebleau-avon', 'bois-le-roi',
  'livry-sur-seine', 'melun', 'le-mee-sur-seine', 'seine-port', 'nandy', 'savigny-le-temple',
  'lieusaint-moissy', 'cesson', 'vert-saint-denis-mongolosse', 'combs-la-ville-quincy',
  
  // Île-de-France detailed coverage
  'chatelet-les-halles', 'gare-du-nord', 'republique', 'bastille', 'nation', 'vincennes',
  'fontenay-sous-bois', 'nogent-sur-marne', 'joinville-le-pont', 'saint-maur-creteil',
  'champigny-sur-marne', 'la-varenne-chennevieres', 'sucy-bonneuil', 'boissy-saint-leger',
  'villeneuve-saint-georges', 'villeneuve-le-roi', 'ablon', 'athis-mons', 'juvisy',
  'savigny-sur-orge', 'epinay-sur-orge', 'saint-michel-sur-orge', 'sainte-genevieve-des-bois',
  'saint-fargeau-ponthierry', 'le-mee-sur-seine', 'melun', 'bois-le-roi', 'fontainebleau-avon',
  'thomery', 'moret-veneux-les-sablons', 'saint-mammes', 'montereau-fault-yonne', 'longueville',
  'citry', 'sainte-colombe', 'la-grande-paroisse', 'marolles-sur-seine', 'bray-sur-seine',
  'nogent-sur-seine', 'romilly-sur-seine', 'pont-sur-seine', 'marcilly-sur-seine', 'sezanne',
  'congy', 'allemant', 'vauchamps', 'montmirail', 'la-ferte-gaucher', 'rebais', 'coulommiers',
  'mouroux', 'faremoutiers', 'jouy-le-chatel', 'rozay-en-brie', 'tournan-en-brie',
  'gretz-armainvilliers', 'ozoir-la-ferriere', 'roissy-en-brie', 'pontault-combault',
  'emerainville-pontault-combault', 'lognes', 'torcy', 'bussy-saint-georges', 'val-d-europe',
  'bailly-romainvilliers', 'chessy-marne-la-vallee', 'esbly', 'meaux', 'trilport',
  'changis-saint-jean', 'la-ferte-sous-jouarre', 'chateau-thierry', 'dormans', 'epernay',
  
  // Suburbs and outer Île-de-France
  'orly-ville', 'rungis-la-fraternelle', 'chevilly-larue', 'villejuif-louis-aragon', 'les-ardoines',
  'vitry-sur-seine', 'ivry-sur-seine', 'bibliotheque-francois-mitterrand', 'austerlitz',
  'pont-de-l-alma', 'invalides', 'pont-de-l-alma', 'champ-de-mars-tour-eiffel', 'bir-hakeim',
  'avenue-foch', 'neuilly-porte-maillot', 'les-sablons-jardin-d-acclimatation', 'pont-de-neuilly',
  'la-defense', 'courbevoie', 'becon-les-bruyeres', 'asnieres-sur-seine', 'bois-colombes',
  'colombes', 'la-garenne-colombes', 'nanterre-universite', 'nanterre-ville', 'rueil-malmaison',
  'chatou-croissy', 'le-vesinet-le-pecq', 'le-vesinet-centre', 'montesson', 'sartrouville',
  'maisons-laffitte', 'acheres-ville', 'poissy', 'verneuil-vernouillet', 'meulan-hardricourt',
  'aubergenville-elisabethville', 'epone-meziere', 'maule', 'beynes', 'neauphle-le-chateau',
  'villiers-neauphle-pontchartrain', 'plaisir-grignon', 'plaisir-les-clayes', 'villepreux-les-clayes',
  'porcheville', 'issou', 'gargenville', 'juziers', 'mericourt', 'flins-aubergenville',
  'les-mureaux', 'vaux-sur-seine', 'meulan-hardricourt', 'juziers', 'gargenville', 'issou',
  'porcheville', 'limay', 'mantes-la-jolie', 'mantes-station', 'buchelay', 'magnanville',
  'guerville', 'rosny-sur-seine', 'bonnieres', 'bennecourt', 'rolleboise', 'saint-martin-la-garenne',
  'gommecourt', 'limetz-villez', 'moisson', 'lavacourt', 'vetheuil', 'haute-isle', 'la-roche-guyon',
  'gasny', 'saint-marcel', 'vernon-giverny', 'douains', 'saint-pierre-d-autils', 'gaillon-aubevoye',
  'val-de-reuil', 'le-vaudreuil', 'incarville', 'pont-de-l-arche', 'oissel', 'grand-couronne',
  'petit-couronne', 'rouen-rive-droite', 'rouen-orleans', 'darnetal', 'saint-etienne-du-rouvray',
  'sotteville-les-rouen', 'quatre-mares', 'grand-quevilly', 'petit-quevilly', 'elbeuf-saint-aubin',
  'elbeuf-ville', 'caudebec-les-elbeuf', 'saint-pierre-les-elbeuf', 'la-londe', 'igoville',
  'pont-de-l-arche', 'criquebeuf-sur-seine', 'poses', 'tournedos-sur-seine', 'muids', 'connelles',
  'herqueville', 'saint-pierre-du-vauvray', 'andé', 'saint-etienne-sous-bailleul', 'gaillon-aubevoye',
  
  // Central France detailed
  'vierzon-ville', 'vierzon-forges', 'mehun-sur-yevre', 'saint-florent-sur-cher', 'saint-doulchard',
  'bourges', 'avord', 'baugy', 'bannay', 'sens-beaujeu', 'cosne-cours-sur-loire', 'myennes',
  'bonny-sur-loire', 'briare', 'gien', 'saint-brisson-sur-loire', 'ouzouer-sur-loire', 'sully-sur-loire',
  'saint-pere-sur-loire', 'chateauneuf-sur-loire', 'jargeau', 'saint-denis-de-l-hotel', 'orleans',
  'fleury-les-aubrais', 'saran', 'saint-jean-de-braye', 'saint-jean-le-blanc', 'saint-cyr-en-val',
  'olivet', 'saint-hilaire-saint-mesmin', 'chaingy', 'meung-sur-loire', 'cravant', 'beaugency',
  'tavers', 'mer', 'suevres', 'menars', 'blois-chambord', 'vineuil', 'cour-cheverny', 'cheverny',
  'bracieux', 'mont-pres-chambord', 'tour-en-sologne', 'salbris', 'pierrefitte-sur-sauldre',
  'argent-sur-sauldre', 'aubigny-sur-nere', 'sainte-solange', 'mehun-sur-yevre', 'marmagne',
  'saint-florent-sur-cher', 'chateaumeillant', 'saint-amand-montrond', 'orval', 'culan', 'ainay-le-vieil',
  'vallon-en-sully', 'huriel', 'montlucon', 'neris-les-bains', 'commentry', 'montmarault', 'gannat',
  'saint-pourcain-sur-sioule', 'billy', 'varennes-sur-allier', 'lapalisse', 'le-donjon', 'dompierre-sur-besbre',
  'diou', 'jaligny-sur-besbre', 'chevagnes', 'moulins-sur-allier', 'yzeure', 'avermes', 'toulon-sur-allier',
  'villeneuve-sur-allier', 'sancoins', 'cours-les-barres', 'bannay', 'belleville-sur-loire', 'sancerre',
  'vailly-sur-sauldre', 'brinon-sur-sauldre', 'argent-sur-sauldre', 'aubigny-sur-nere', 'henrichemont',
  'sainte-solange', 'foecy', 'quincy', 'reuilly', 'issoudun', 'vatan', 'gracay', 'saint-aignan',
  'selles-sur-cher', 'romorantin-lanthenay', 'pruniers-en-sologne', 'souesmes', 'lamotte-beuvron',
  'nouan-le-fuzelier', 'la-ferte-saint-aubin', 'artenay', 'chevilly', 'baule', 'cercottes', 'gidy',
  'saint-ay', 'saint-laurent-nouan', 'muides-sur-loire', 'saint-dyé-sur-loire', 'chambord', 'mont-pres-chambord'
];

// Generate station data with mock information
export function generateStationData(slug: string) {
  const name = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  // Define regions based on slug patterns
  let region = 'France';
  if (slug.includes('paris')) region = 'Île-de-France';
  else if (slug.includes('lyon')) region = 'Auvergne-Rhône-Alpes';
  else if (slug.includes('marseille') || slug.includes('nice') || slug.includes('toulon') || slug.includes('cannes') || slug.includes('antibes')) region = 'Provence-Alpes-Côte d\'Azur';
  else if (slug.includes('lille')) region = 'Hauts-de-France';
  else if (slug.includes('bordeaux') || slug.includes('pau') || slug.includes('bayonne') || slug.includes('biarritz')) region = 'Nouvelle-Aquitaine';
  else if (slug.includes('toulouse') || slug.includes('montpellier') || slug.includes('perpignan') || slug.includes('beziers')) region = 'Occitanie';
  else if (slug.includes('nantes') || slug.includes('angers') || slug.includes('le-mans')) region = 'Pays de la Loire';
  else if (slug.includes('strasbourg') || slug.includes('metz') || slug.includes('nancy') || slug.includes('reims')) region = 'Grand Est';
  else if (slug.includes('rennes') || slug.includes('brest') || slug.includes('quimper') || slug.includes('lorient') || slug.includes('vannes') || slug.includes('saint-malo')) region = 'Bretagne';
  else if (slug.includes('caen') || slug.includes('rouen') || slug.includes('cherbourg') || slug.includes('bayeux') || slug.includes('lisieux')) region = 'Normandie';
  else if (slug.includes('dijon') || slug.includes('besancon') || slug.includes('chalon') || slug.includes('macon') || slug.includes('bourg-en-bresse')) region = 'Bourgogne-Franche-Comté';
  else if (slug.includes('orleans') || slug.includes('tours') || slug.includes('blois') || slug.includes('chartres') || slug.includes('bourges') || slug.includes('chateauroux')) region = 'Centre-Val de Loire';
  else if (slug.includes('grenoble') || slug.includes('chambery') || slug.includes('annecy') || slug.includes('saint-etienne') || slug.includes('clermont-ferrand')) region = 'Auvergne-Rhône-Alpes';
  else if (slug.includes('amiens') || slug.includes('compiegne') || slug.includes('soissons') || slug.includes('laon') || slug.includes('saint-quentin')) region = 'Hauts-de-France';
  else if (slug.includes('troyes') || slug.includes('chalons') || slug.includes('charleville') || slug.includes('sedan') || slug.includes('epernay')) region = 'Grand Est';
  else if (slug.includes('nevers') || slug.includes('moulins') || slug.includes('vichy') || slug.includes('montlucon') || slug.includes('aurillac')) region = 'Auvergne-Rhône-Alpes';
  else if (slug.includes('poitiers') || slug.includes('la-rochelle') || slug.includes('niort') || slug.includes('angouleme') || slug.includes('limoges')) region = 'Nouvelle-Aquitaine';

  // Generate realistic coordinates based on region
  let latitude = 46.2276; // Default to center of France
  let longitude = 2.2137;
  
  if (region === 'Île-de-France') { latitude = 48.8566; longitude = 2.3522; }
  else if (region === 'Provence-Alpes-Côte d\'Azur') { latitude = 43.9352; longitude = 6.0679; }
  else if (region === 'Auvergne-Rhône-Alpes') { latitude = 45.7640; longitude = 4.8357; }
  else if (region === 'Hauts-de-France') { latitude = 50.4801; longitude = 2.7937; }
  else if (region === 'Nouvelle-Aquitaine') { latitude = 45.8336; longitude = -0.5812; }
  else if (region === 'Occitanie') { latitude = 43.6047; longitude = 1.4442; }
  else if (region === 'Pays de la Loire') { latitude = 47.2184; longitude = -1.5536; }
  else if (region === 'Grand Est') { latitude = 48.5734; longitude = 7.7521; }
  else if (region === 'Bretagne') { latitude = 48.1173; longitude = -1.6778; }
  else if (region === 'Normandie') { latitude = 49.1829; longitude = -0.3707; }
  else if (region === 'Bourgogne-Franche-Comté') { latitude = 47.3220; longitude = 5.0415; }
  else if (region === 'Centre-Val de Loire') { latitude = 47.9029; longitude = 1.9093; }

  return {
    id: `stop_area:SNCF:${slug}`,
    nom: name,
    slug: slug,
    coordonnees: { latitude, longitude },
    region: region,
    code_uic: `87${Math.floor(Math.random() * 900000) + 100000}`,
  };
}