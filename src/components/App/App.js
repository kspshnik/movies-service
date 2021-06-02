import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import MoviesPage from '../MoviesPage/MoviesPage';
import FavouriteMoviesPage from '../MoviesPage/FavouriteMoviesPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import SignUpPage from '../SignupPage/SignUpPage';
import SignInPage from '../SigninPage/SignIn';
import Footer from '../Footer/Footer';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import LandingPage from '../LandingPage/LandingPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

import { getBeatFilms } from '../../helpers/api';

function App() {
  const getMoviesCount = () => {
    const rootElement = document.documentElement;
    return parseInt(getComputedStyle(rootElement).getPropertyValue('--movies_count'), 10);
  };
  const [columnsCount, setColumnsCount] = useState(getMoviesCount());
  // const [isLoggedIn, setLoggedIn] = useState(false);
  const [isHamburgerOpen, setHamburgerVisibility] = useState(false);
  //  const [favMovies, setFavMovies] = useState([]);
  const isLoggedIn = false;
  const [allMovies, setAllMovies] = useState([]);
  const [favourities, setFavorities] = useState([2, 3, 7]);

  const [isReloadRequested, setReloadState] = useState(false);

  const [isBeatFilmsLoading, setBeatFilmsLoadingState] = useState(false);

  const mockAllMovies = [
    {
      id: 1,
      nameRU: '«Роллинг Стоунз» в изгнании',
      nameEN: 'Stones in Exile',
      director: 'Стивен Кайак ',
      country: 'США',
      year: '2010',
      duration: 61,
      description: 'В конце 1960-х группа «Роллинг Стоунз», несмотря на все свои мегахиты и сверхуспешные концертные туры, была разорена. Виной всему — бездарный менеджмент и драконовское налогообложение в Британии. Тогда музыканты приняли не самое простое для себя решение: летом 1971 года после выхода альбома «Stiсky Fingers» они отправились на юг Франции записывать новую пластинку. Именно там, на Лазурном Берегу, в арендованном Китом Ричардсом подвале виллы Неллькот родился сборник «Exile on Main St.», который стал лучшим альбомом легендарной группы.',
      trailerLink: 'https://www.youtube.com/watch?v=UXcqcdYABFw',
      created_at: '2020-11-23T14:12:21.376Z',
      updated_at: '2020-11-23T14:12:21.376Z',
      image: {
        id: 1,
        name: 'stones-in-exile',
        alternativeText: '',
        caption: '',
        width: 512,
        height: 279,
        formats: {
          thumbnail: {
            hash: 'thumbnail_stones_in_exile_b2f1b8f4b7',
            ext: '.jpeg',
            mime: 'image/jpeg',
            width: 245,
            height: 134,
            size: 8.79,
            path: null,
            url: '/uploads/thumbnail_stones_in_exile_b2f1b8f4b7.jpeg',
          },
          small: {
            hash: 'small_stones_in_exile_b2f1b8f4b7',
            ext: '.jpeg',
            mime: 'image/jpeg',
            width: 500,
            height: 272,
            size: 25.68,
            path: null,
            url: '/uploads/small_stones_in_exile_b2f1b8f4b7.jpeg',
          },
        },
        hash: 'stones_in_exile_b2f1b8f4b7',
        ext: '.jpeg',
        mime: 'image/jpeg',
        size: 25.53,
        url: '/uploads/stones_in_exile_b2f1b8f4b7.jpeg',
        previewUrl: null,
        provider: 'local',
        provider_metadata: null,
        created_at: '2020-11-23T14:11:57.313Z',
        updated_at: '2020-11-23T14:11:57.313Z',
      },
    },
    {
      id: 2,
      nameRU: "All Tomorrow's Parties",
      nameEN: "All Tomorrow's Parties",
      director: ' Джонатан Кауэтт',
      country: 'Великобритания',
      year: '2009',
      duration: 82,
      description: 'Хроники британского фестиваля, который первым нарушил монополию «Гластонбери», «Ридинга» и прочих пивных сборищ в чистом поле — и с тех пор прослыл одним из самых независимых и принципиальных. ATP из года в год проходит на базе отдыха в английской глуши, где артисты и их поклонники живут в одинаковых номерах, не бывает коммерческих спонсоров, программу составляют приглашенные кураторы (в разное время ими были Ник Кейв, Belle & Sebastian, Sonic Youth и даже Мэтт Грейнинг). И, главное, где не любят вздорных людей — основатель фестиваля Барри Хоган однажды сказал, что никогда больше не станет иметь дело с группой Killing Joke, «потому что они му...аки». Эта демократичность сказалась и на фильме: часть съемок сделана адептами фестиваля на мобильный телефон.',
      trailerLink: 'https://www.youtube.com/watch?v=D5fBhbEJxEU',
      created_at: '2020-11-23T14:15:19.238Z',
      updated_at: '2020-11-23T14:15:19.238Z',
      image: {
        id: 2,
        name: 'all-tommoros-parties',
        alternativeText: '',
        caption: '',
        width: 699,
        height: 266,
        formats: {
          thumbnail: {
            hash: 'thumbnail_all_tommoros_parties_33a125248d',
            ext: '.jpeg',
            mime: 'image/jpeg',
            width: 245,
            height: 93,
            size: 10.33,
            path: null,
            url: '/uploads/thumbnail_all_tommoros_parties_33a125248d.jpeg',
          },
          small: {
            hash: 'small_all_tommoros_parties_33a125248d',
            ext: '.jpeg',
            mime: 'image/jpeg',
            width: 500,
            height: 190,
            size: 35.24,
            path: null,
            url: '/uploads/small_all_tommoros_parties_33a125248d.jpeg',
          },
        },
        hash: 'all_tommoros_parties_33a125248d',
        ext: '.jpeg',
        mime: 'image/jpeg',
        size: 67.06,
        url: '/uploads/all_tommoros_parties_33a125248d.jpeg',
        previewUrl: null,
        provider: 'local',
        provider_metadata: null,
        created_at: '2020-11-23T14:14:08.595Z',
        updated_at: '2020-11-23T14:14:08.595Z',
      },
    },
    {
      id: 3,
      nameRU: ' Без обратного пути',
      nameEN: 'No Distance Left to Run',
      director: 'Уилл Лавлейс, Дилан Сотерн',
      country: 'Великобритания',
      year: '2010',
      duration: 104,
      description: 'Затеянный по такому подозрительному поводу, как реюнион Blur в 2009-м году фильм начисто лишен присущего моменту пафоса и выхолощенности речей. Вернее, что-то похожее неизбежно возникает, когда ты видишь, как забитый до отказа Гайд-парк как в последний раз ревет «Song 2», но это лишь буквальное свидетельство того, что Blur — великая группа. К счастью, помимо прямых и косвенных свидетельств этого, в «No Distance Left to Run» хватает острых углов, неловких моментов и всего того сора, из которого рождаются по-настоящему отличные группы: помимо важных, но общеизвестных моментов (вроде соперничества с Oasis за первенство в том же бритпопе) визуализируются и те, что всегда оставались за кадром: наркотическая зависимость, неутихающие костры амбиций, ревность, обиды, слава — и все это блестяще снято на фоне истории того, что вообще происходило в Британии времен Блэра.',
      trailerLink: 'https://www.youtube.com/watch?v=6iYxdghpJZY',
      created_at: '2020-11-23T14:17:23.257Z',
      updated_at: '2020-11-23T14:17:23.257Z',
      image: {
        id: 3,
        name: 'blur',
        alternativeText: '',
        caption: '',
        width: 460,
        height: 298,
        formats: {
          thumbnail: {
            hash: 'thumbnail_blur_a43fcf463d',
            ext: '.jpeg',
            mime: 'image/jpeg',
            width: 241,
            height: 156,
            size: 8.32,
            path: null,
            url: '/uploads/thumbnail_blur_a43fcf463d.jpeg',
          },
        },
        hash: 'blur_a43fcf463d',
        ext: '.jpeg',
        mime: 'image/jpeg',
        size: 21.07,
        url: '/uploads/blur_a43fcf463d.jpeg',
        previewUrl: null,
        provider: 'local',
        provider_metadata: null,
        created_at: '2020-11-23T14:17:01.702Z',
        updated_at: '2020-11-23T14:17:01.702Z',
      },
    },
    {
      id: 4,
      nameRU: 'Bassweight',
      nameEN: 'Bassweight',
      director: 'Сурид Хассан',
      country: 'Великобритания',
      year: '2008',
      duration: 61,
      description: 'Фильм про самую многообещающую музыкальную субкультуру нулевых использует тот же ассоциативный ряд, что и искомая музыка: низкое, затянутое облаками небо южного Лондона, приглушенный свет, массивный бас, удары которого отдаются в грудной клетке, негромкая речь людей, предпочитающих не показывать свои лица. Впрочем, все ключевые для дабстепа люди здесь, конечно, имеются — Бенга, Скрим, Kode 9, Мэри Энн Хоббс и прочие, а география не сводится к одному только Кройдону — следом за исторической родиной дабстепа режиссер фильма исследует и другие очаги возгорания, включая Бразилию и Японию.',
      trailerLink: 'https://www.youtube.com/watch?v=dgSyC6me-jQ',
      created_at: '2020-12-02T16:48:01.794Z',
      updated_at: '2020-12-02T16:48:01.794Z',
      image: {
        id: 4,
        name: 'загруженное',
        alternativeText: '',
        caption: '',
        width: 276,
        height: 183,
        formats: {
          thumbnail: {
            hash: 'thumbnail_zagruzhennoe_113f557116',
            ext: '.jpeg',
            mime: 'image/jpeg',
            width: 235,
            height: 156,
            size: 6.59,
            path: null,
            url: '/uploads/thumbnail_zagruzhennoe_113f557116.jpeg',
          },
        },
        hash: 'zagruzhennoe_113f557116',
        ext: '.jpeg',
        mime: 'image/jpeg',
        size: 7.01,
        url: '/uploads/zagruzhennoe_113f557116.jpeg',
        previewUrl: null,
        provider: 'local',
        provider_metadata: null,
        created_at: '2020-12-02T16:47:22.972Z',
        updated_at: '2020-12-02T16:47:22.972Z',
      },
    },
    {
      id: 5,
      nameRU: 'Taqwacore: The Birth of Punk Islam',
      nameEN: 'Taqwacore: The Birth of Punk Islam',
      director: ' Омар Маджид',
      country: 'Канада',
      year: '2009',
      duration: 80,
      description: "**Don't panic, we're Islamic!**\nПакистанские лесбиянки из Ванкувера, арабские хеви-металлисты из Чикаго, группа Vote Hezbollah, ведомая иранцем из Сан-Антонио, — все это невымышленные, сплошь настоящие персонажи, запечатленные в первом документальном свидетельстве о субкультуре исламского панка. Хотя до недавнего времени исламский панк, он же taqwacore, был художественным вымыслом, вышедшим из-под пера писателя-мусульманина Майкла Мухаммеда Найта, его книга сделала это явление вполне реальным, тогда как сам он стал главным героем фильма.\n",
      trailerLink: 'https://www.youtube.com/watch?v=JMZ8DO9F4Mo',
      created_at: '2020-12-02T20:35:14.745Z',
      updated_at: '2020-12-02T20:35:14.745Z',
      image: {
        id: 5,
        name: 'taqwacore2',
        alternativeText: '',
        caption: '',
        width: 730,
        height: 411,
        formats: {
          thumbnail: {
            hash: 'thumbnail_taqwacore2_2f487d2e74',
            ext: '.jpeg',
            mime: 'image/jpeg',
            width: 245,
            height: 138,
            size: 7.01,
            path: null,
            url: '/uploads/thumbnail_taqwacore2_2f487d2e74.jpeg',
          },
          small: {
            hash: 'small_taqwacore2_2f487d2e74',
            ext: '.jpeg',
            mime: 'image/jpeg',
            width: 500,
            height: 282,
            size: 16.29,
            path: null,
            url: '/uploads/small_taqwacore2_2f487d2e74.jpeg',
          },
        },
        hash: 'taqwacore2_2f487d2e74',
        ext: '.jpeg',
        mime: 'image/jpeg',
        size: 24.89,
        url: '/uploads/taqwacore2_2f487d2e74.jpeg',
        previewUrl: null,
        provider: 'local',
        provider_metadata: null,
        created_at: '2020-12-02T20:34:50.858Z',
        updated_at: '2020-12-02T20:34:50.858Z',
      },
    },
    {
      id: 6,
      nameRU: 'Фавела на взрыве',
      nameEN: 'Favela on Blast',
      director: 'Уэсли Пенц',
      country: 'Бразилия',
      year: '2008',
      duration: 80,
      description: '**Визионер из трущоб**\nГимн бразильским гетто (они же фавелы), породившим байле-фанк — взбалмошную смесь музыки стран третьего мира, нелегального рейва и злого фанка, на волне которого вышли в люди Майя и Сантиголд. Снял фильм не кто иной, как Дипло (он же Уэсли Пенц) — диджей, продюсер и крестный отец двух вышеупомянутых артисток. Поэтому неудивительно, что вместо истории жанра в сухом остатке у него вышла увлекательная этнографическая экспедиция в трущобы Рио-де-Жанейро, где наркотики, секс и зашкаливающий уровень преступности играют в становлении байле-фанка не меньшую роль, чем сама музыка.\n',
      trailerLink: 'https://www.youtube.com/watch?v=Cugdwa7mndA',
      created_at: '2020-12-02T20:37:33.665Z',
      updated_at: '2020-12-02T20:37:33.665Z',
      image: {
        id: 6,
        name: '881707734_640',
        alternativeText: '',
        caption: '',
        width: 640,
        height: 360,
        formats: {
          thumbnail: {
            hash: 'thumbnail_881707734_640_d6a3a43358',
            ext: '.jpeg',
            mime: 'image/jpeg',
            width: 245,
            height: 138,
            size: 6.09,
            path: null,
            url: '/uploads/thumbnail_881707734_640_d6a3a43358.jpeg',
          },
          small: {
            hash: 'small_881707734_640_d6a3a43358',
            ext: '.jpeg',
            mime: 'image/jpeg',
            width: 500,
            height: 281,
            size: 17.26,
            path: null,
            url: '/uploads/small_881707734_640_d6a3a43358.jpeg',
          },
        },
        hash: '881707734_640_d6a3a43358',
        ext: '.jpeg',
        mime: 'image/jpeg',
        size: 23.67,
        url: '/uploads/881707734_640_d6a3a43358.jpeg',
        previewUrl: null,
        provider: 'local',
        provider_metadata: null,
        created_at: '2020-12-02T20:37:23.499Z',
        updated_at: '2020-12-02T20:37:23.499Z',
      },
    },
    {
      id: 7,
      nameRU: 'Постеры, сошедшие со стен',
      nameEN: 'The Posters Came from the Walls',
      director: 'Джереми Деллер, Николас Абрахамс',
      country: 'Великобритания',
      year: '2008',
      duration: 72,
      description: '**Depeche Mode как смысл жизни**\nКругосветная панорама, показывающая обычаи и традиции поклонников Depeche Mode по всему миру: от России до Ирана. Отправившись снимать парадную картину, рассказывающую о том, как любят группу Depeche Mode за пределами Британии, авторы фильма столкнулись с тем, что любовь эта подчас носит очень личный — и в то же время общенациональный — характер.\n',
      trailerLink: 'https://www.youtube.com/watch?v=VFMU3crg0sM',
      created_at: '2020-12-02T20:40:08.342Z',
      updated_at: '2020-12-02T20:40:08.342Z',
      image: {
        id: 7,
        name: 'posters-came-from-the-walls-2009-001-posters',
        alternativeText: '',
        caption: '',
        width: 1000,
        height: 750,
        formats: {
          thumbnail: {
            hash: 'thumbnail_posters_came_from_the_walls_2009_001_posters_180fe1a19f',
            ext: '.jpeg',
            mime: 'image/jpeg',
            width: 208,
            height: 156,
            size: 10.53,
            path: null,
            url: '/uploads/thumbnail_posters_came_from_the_walls_2009_001_posters_180fe1a19f.jpeg',
          },
          medium: {
            hash: 'medium_posters_came_from_the_walls_2009_001_posters_180fe1a19f',
            ext: '.jpeg',
            mime: 'image/jpeg',
            width: 750,
            height: 563,
            size: 92.16,
            path: null,
            url: '/uploads/medium_posters_came_from_the_walls_2009_001_posters_180fe1a19f.jpeg',
          },
          small: {
            hash: 'small_posters_came_from_the_walls_2009_001_posters_180fe1a19f',
            ext: '.jpeg',
            mime: 'image/jpeg',
            width: 500,
            height: 375,
            size: 46.34,
            path: null,
            url: '/uploads/small_posters_came_from_the_walls_2009_001_posters_180fe1a19f.jpeg',
          },
        },
        hash: 'posters_came_from_the_walls_2009_001_posters_180fe1a19f',
        ext: '.jpeg',
        mime: 'image/jpeg',
        size: 153.63,
        url: '/uploads/posters_came_from_the_walls_2009_001_posters_180fe1a19f.jpeg',
        previewUrl: null,
        provider: 'local',
        provider_metadata: null,
        created_at: '2020-12-02T20:39:50.486Z',
        updated_at: '2020-12-02T20:39:50.486Z',
      },
    },
    {
      id: 16,
      nameRU: ' С ног на голову: История Creation records',
      nameEN: 'Upside Down: The Creation Records Story',
      director: "Дэнни О'Коннор",
      country: 'Великобритания',
      year: '2010',
      duration: 101,
      description: 'История Creation Records – самого влиятельного британского лейбла конца прошло века – это во многом история его бессменного отца-основателя Алана МакГи, чья бизнес-стратегия всегда выстраивалась в зависимости от того, что он употреблял наканун. Однако, именно благодаря ему мировая общественность узнала о существовании таких групп как Primal Scream, My Bloody Valentine и Oasis. Последних МакГи нашел в пабе, где группа давала второй в своей жизни концерт, по чистой случайности, попросту опоздав на поезд, Впрочем, его политика отбора всегда носила пристрастный характер, с Бобби Гилеспи он, например, познакомился еще в школе. Фильм ностальгически оглядывается на Британию 90-х, когда ее вкусами правили гении и аутсайдеры, талантливые сумасброды и жадные до приключений авантюристы всех мастей.',
      trailerLink: 'https://www.youtube.com/watch?v=b3kA_8NrinA',
      created_at: '2020-12-02T21:17:32.028Z',
      updated_at: '2020-12-02T21:17:32.028Z',
      image: {
        id: 16,
        name: 'b452eefcd7d441e79b2f5ae291b7',
        alternativeText: '',
        caption: '',
        width: 1425,
        height: 712,
        formats: {
          thumbnail: {
            hash: 'thumbnail_b452eefcd7d441e79b2f5ae291b7_2c0c62fa89',
            ext: '.jpeg',
            mime: 'image/jpeg',
            width: 245,
            height: 122,
            size: 5.54,
            path: null,
            url: '/uploads/thumbnail_b452eefcd7d441e79b2f5ae291b7_2c0c62fa89.jpeg',
          },
          large: {
            hash: 'large_b452eefcd7d441e79b2f5ae291b7_2c0c62fa89',
            ext: '.jpeg',
            mime: 'image/jpeg',
            width: 1000,
            height: 500,
            size: 53.78,
            path: null,
            url: '/uploads/large_b452eefcd7d441e79b2f5ae291b7_2c0c62fa89.jpeg',
          },
          medium: {
            hash: 'medium_b452eefcd7d441e79b2f5ae291b7_2c0c62fa89',
            ext: '.jpeg',
            mime: 'image/jpeg',
            width: 750,
            height: 375,
            size: 33.78,
            path: null,
            url: '/uploads/medium_b452eefcd7d441e79b2f5ae291b7_2c0c62fa89.jpeg',
          },
          small: {
            hash: 'small_b452eefcd7d441e79b2f5ae291b7_2c0c62fa89',
            ext: '.jpeg',
            mime: 'image/jpeg',
            width: 500,
            height: 250,
            size: 17.5,
            path: null,
            url: '/uploads/small_b452eefcd7d441e79b2f5ae291b7_2c0c62fa89.jpeg',
          },
        },
        hash: 'b452eefcd7d441e79b2f5ae291b7_2c0c62fa89',
        ext: '.jpeg',
        mime: 'image/jpeg',
        size: 83.6,
        url: '/uploads/b452eefcd7d441e79b2f5ae291b7_2c0c62fa89.jpeg',
        previewUrl: null,
        provider: 'local',
        provider_metadata: null,
        created_at: '2020-12-02T21:16:16.072Z',
        updated_at: '2020-12-02T21:16:16.072Z',
      },
    },
    {
      id: 17,
      nameRU: 'Я всё ещё здесь',
      nameEN: 'I’m Still Here',
      director: 'Кейси Аффлек',
      country: 'США',
      year: '2010',
      duration: 108,
      description: 'Режиссерский дебют Кейси Аффлека — фильм о том, как актер Хоакин Феникс, номинированный на премию «Оскар» за роль Джонни Кэша в фильме «Переступить черту», решает бросить актерскую карьеру и начинает читать рэп, больно наступая, кажется, на все возможные грабли и в конечном счете удаляясь в неизвестном направлении по пояс в воде. Ну а то обстоятельство, что впоследствии Кейси Аффлека изобличили в том, что большая часть съемок была постановочной, если о чем и свидетельствует, то только о том, что Хоакин Феникс блистательным образом играет себя самого.',
      trailerLink: 'https://www.youtube.com/watch?v=cDwdYsOeSXw',
      created_at: '2020-12-02T21:19:02.529Z',
      updated_at: '2020-12-02T21:19:02.529Z',
      image: {
        id: 17,
        name: '280x178_2',
        alternativeText: '',
        caption: '',
        width: 560,
        height: 356,
        formats: {
          thumbnail: {
            hash: 'thumbnail_280x178_2_f2eee77cae',
            ext: '.jpeg',
            mime: 'image/jpeg',
            width: 245,
            height: 156,
            size: 4.59,
            path: null,
            url: '/uploads/thumbnail_280x178_2_f2eee77cae.jpeg',
          },
          small: {
            hash: 'small_280x178_2_f2eee77cae',
            ext: '.jpeg',
            mime: 'image/jpeg',
            width: 500,
            height: 318,
            size: 16.39,
            path: null,
            url: '/uploads/small_280x178_2_f2eee77cae.jpeg',
          },
        },
        hash: '280x178_2_f2eee77cae',
        ext: '.jpeg',
        mime: 'image/jpeg',
        size: 20.54,
        url: '/uploads/280x178_2_f2eee77cae.jpeg',
        previewUrl: null,
        provider: 'local',
        provider_metadata: null,
        created_at: '2020-12-02T21:18:53.210Z',
        updated_at: '2020-12-02T21:18:53.210Z',
      },
    }];

  useEffect(() => {
    const setColumns = () => {
      setColumnsCount(getMoviesCount());
    };
    window.addEventListener('resize', setColumns);
    return () => window.removeEventListener('resize', setColumns);
  }, []);

  // useEffect(() => { setFavMovies(mockAllMovies.filter(({ id }) => favourities.includes(id))); },
  //  [mockAllMovies, favourities]);
  async function getAllMovies() {
    try {
      setBeatFilmsLoadingState(true);
      const beatPromise = getBeatFilms();
      const films = await beatPromise;
      console.log(typeof films);
      setAllMovies(films);
    } catch (error) {
      console.dir(error);
    } finally {
      setBeatFilmsLoadingState(false);
      setReloadState(false);
    }
  }
  function handleOpenHamburger() {
    setHamburgerVisibility(true);
  }
  function handleCloseHamburger() {
    setHamburgerVisibility(false);
  }

  function handleMovieLike(id) {
    setFavorities([...favourities, id]);
  }

  function handleMovieDislike(id) {
    setFavorities(() => favourities.filter((movie) => movie !== id));
  }

  function handleBeatMoviesRefresh() {
    setReloadState(true);
  }
  useEffect(() => {
    if (isReloadRequested) {
      getAllMovies();
    }
  }, [isReloadRequested]);

  const stubLogic = () => null;
  return (
    <div className='page typo'>
      <ErrorBoundary>
        <Header
          isLoggedIn={isLoggedIn}
          isHamburger={columnsCount < 4}
          onHamburgerOpen={handleOpenHamburger} />
      </ErrorBoundary>
      <Switch>
        <Route path='/films'>
          <ErrorBoundary>
            <MoviesPage
              allMovies={allMovies}
              favourities={favourities}
              columns={columnsCount}
              onMovieDislike={handleMovieDislike}
              onMovieLike={handleMovieLike}
              isLoading={isBeatFilmsLoading}
              onRefreshRequest={handleBeatMoviesRefresh} />
          </ErrorBoundary>
        </Route>

        <Route path='/saved-films'>
          <ErrorBoundary>
            <FavouriteMoviesPage
              favouriteMovies={mockAllMovies.filter(({ id }) => favourities.includes(id))}
              columns={columnsCount}
              onMovieDislike={handleMovieDislike}
              onMovieLike={handleMovieLike} />
          </ErrorBoundary>
        </Route>
        <Route path='/profile'>
          <ErrorBoundary>
            <ProfilePage
              onSubmitProfile={stubLogic}
              onSignOut={stubLogic} />
          </ErrorBoundary>
        </Route>
        <Route path='/signup'>
          <ErrorBoundary>
            <SignUpPage
              onSignUpSubmit={stubLogic} />
          </ErrorBoundary>
        </Route>
        <Route path='/signin'>
          <ErrorBoundary>
            <SignInPage
              onSignInSubmit={stubLogic} />
          </ErrorBoundary>
        </Route>
        <Route exact path='/'>
          <ErrorBoundary>
            <LandingPage />
          </ErrorBoundary>
        </Route>
        <Route path='*'>
          <ErrorBoundary>
            <NotFoundPage />
          </ErrorBoundary>
        </Route>
      </Switch>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
      <HamburgerMenu
        isHamburgerOpen={isHamburgerOpen}
        onHamburgerOpen={handleOpenHamburger}
        onHamburgerClose={handleCloseHamburger} />
    </div>
  );
}

export default App;
