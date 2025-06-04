-- MySQL dump 10.13  Distrib 8.0.42, for Linux (aarch64)
--
-- Host: localhost    Database: hanarodb
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

INSERT INTO Category (name) VALUES
  ('JavaScript'),
  ('TypeScript'),
  ('React'),
  ('NextJS');

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post`
--

DROP TABLE IF EXISTS `Post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `category_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `writedt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `editdt` datetime DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `user_id` (`user_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`),
  CONSTRAINT `post_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `Category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post`
--

LOCK TABLES `Post` WRITE;
/*!40000 ALTER TABLE `Post` DISABLE KEYS */;
/*!40000 ALTER TABLE `Post` ENABLE KEYS */;
UNLOCK TABLES;

INSERT INTO Post (title, content, category_id, user_id) VALUES
('호이스팅의 원리', 'JavaScript에서 호이스팅(Hoisting)은 변수 선언과 함수 선언이 해당 스코프의 최상단으로 끌어올려지는 동작을 의미합니다.\n\nvar, function 키워드로 선언된 변수와 함수는 런타임 전에 메모리에 먼저 등록되어 참조가 가능하지만, let, const로 선언한 변수는 TDZ(Temporal Dead Zone)에 의해 초기화 전 접근 시 ReferenceError가 발생합니다.\n\n예:\nconsole.log(a); // undefined\nvar a = 5;\n\nconsole.log(b); // ReferenceError\nlet b = 10;\n\n이처럼 호이스팅은 변수 선언만 끌어올려지며, 초기화는 코드 흐름대로 진행된다는 점에 주의해야 합니다.', 1, 1),
('디스트럭처링(destructuring)', '디스트럭처링(Destructuring)은 배열이나 객체에서 값을 추출해 변수에 쉽게 할당할 수 있도록 하는 JavaScript 문법입니다.\n\n배열 예:\nconst [a, b] = [1, 2];\nconsole.log(a); // 1\n\n객체 예:\nconst user = { name: \'John\', age: 30 };\nconst { name, age } = user;\nconsole.log(name); // John\n\n기본값 설정, 중첩 구조 추출, 별칭 지정 등 다양한 패턴으로 가독성과 효율을 높일 수 있는 문법입니다.', 1, 1);
INSERT INTO Post (title, content, category_id, user_id) VALUES
('스코프와 실행컨텍스트', '스코프(Scope)는 변수에 접근할 수 있는 유효 범위를 의미합니다. JavaScript에는 전역 스코프, 함수 스코프, 블록 스코프가 있습니다.\n\n실행 컨텍스트(Execution Context)는 코드가 실행되는 환경을 의미하며, 함수가 호출될 때마다 생성됩니다. 컨텍스트는 Lexical Environment를 포함하며, 변수, 함수 선언, this 바인딩 등의 정보를 포함합니다.\n\n코드 실행 흐름은 다음 순서로 이루어집니다:\n1. 실행 컨텍스트 생성\n2. 변수 환경, 스코프 체인 구성\n3. 코드 실행 단계 (선언 -> 초기화 -> 실행)\n\n이 과정을 통해 JS 엔진은 스코프 체인을 따라 변수나 함수를 탐색하게 됩니다.', 1, 1),
('클로저', '클로저(Closure)란 외부 함수의 변수에 접근할 수 있는 내부 함수를 의미합니다.\n\n예:\nfunction outer() {\n  let count = 0;\n  return function inner() {\n    count++;\n    console.log(count);\n  }\n}\nconst counter = outer();\ncounter(); // 1\ncounter(); // 2\n\n위 코드에서 inner 함수는 outer 함수의 변수 count에 계속 접근할 수 있습니다. 이런 클로저는 데이터 은닉, 함수형 프로그래밍, 이벤트 핸들링 등에 널리 사용됩니다.', 1, 1);
INSERT INTO Post (title, content, category_id, user_id) VALUES
('유니언과 리터럴', 'TypeScript에서 유니언 타입(Union Type)은 여러 타입 중 하나가 될 수 있음을 나타냅니다.\n\n예:\nlet value: string | number;\nvalue = \'hello\'; // ✅\nvalue = 42;      // ✅\n\n리터럴 타입(Literal Type)은 특정 값만 가질 수 있는 타입입니다.\n\n예:\ntype Direction = \'left\' | \'right\' | \'up\' | \'down\';\nlet move: Direction;\nmove = \'up\';     // ✅\nmove = \'center\'; // ❌ Error\n\n리터럴 타입은 유니언과 함께 사용하면 타입 안정성을 높이는 데 효과적이며, 제한된 값만 허용하는 API 설계 등에 자주 활용됩니다.', 2, 1),
('배열과 튜플', 'TypeScript에서 배열은 동일한 타입의 요소 목록이며, 튜플은 고정된 길이와 각 요소의 타입이 지정된 배열입니다.\n\n📌 배열 예시:\nlet names: string[] = [\'Alice\', \'Bob\'];\n\n📌 튜플 예시:\nlet person: [string, number] = [\'Alice\', 30];\n// person[0]은 string, person[1]은 number\n\n튜플은 구조적 데이터를 명확히 표현할 수 있어서 React의 useState, API 응답 등에서 자주 활용됩니다.', 2, 1);
INSERT INTO Post (title, content, category_id, user_id) VALUES
('제네릭(Generic)', '제네릭(Generic)은 함수나 클래스에서 타입을 고정하지 않고, 사용하는 시점에 타입을 주입받아 유연하고 재사용 가능한 코드를 작성할 수 있게 해줍니다.\n\n예:\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nidentity<string>(\'hello\'); // 반환 타입: string\nidentity<number>(123);     // 반환 타입: number\n\n배열 예시:\nfunction getFirst<T>(arr: T[]): T {\n  return arr[0];\n}\n\n제네릭은 타입 안정성을 유지하면서도 다양한 타입에 대해 동작하는 코드를 작성할 수 있어, 라이브러리 및 유틸 함수 구현에 자주 사용됩니다.', 2, 1),
('JSX and Component', 'JSX는 JavaScript XML의 줄임말로, React에서 UI를 선언적으로 작성할 수 있도록 해주는 문법입니다. HTML과 유사하지만, JavaScript의 표현식도 사용할 수 있습니다.\n\n예:\nconst element = <h1>Hello, React!</h1>;\n\n컴포넌트(Component)는 UI의 재사용 가능한 조각입니다. 함수형 컴포넌트를 통해 UI를 독립적으로 관리하고 조합할 수 있습니다.\n\n예:\nfunction Welcome(props) {\n  return <h1>안녕하세요, {props.name}님!</h1>;\n}\n\nReact는 컴포넌트 기반 아키텍처를 통해 코드의 재사용성과 유지보수성을 높여줍니다.', 3, 1);
INSERT INTO Post (title, content, category_id, user_id) VALUES
('React Hooks', 'React Hooks는 함수형 컴포넌트에서 상태 관리 및 생명주기 로직을 사용할 수 있게 해주는 기능입니다.\n\n대표적인 Hook:\n- useState: 컴포넌트 내 상태 관리\n- useEffect: 컴포넌트 생명주기 대응\n- useRef: DOM 참조 혹은 값 유지\n- useMemo, useCallback: 성능 최적화\n\n예:\nconst [count, setCount] = useState(0);\n\nuseEffect(() => {\n  console.log(\'컴포넌트가 마운트됨\');\n}, []);\n\nHooks를 통해 클래스 없이도 복잡한 상태 관리 및 사이드 이펙트를 처리할 수 있습니다.', 3, 1),
('React Routing', 'React Router는 SPA(Single Page Application)에서 페이지 전환을 가능하게 하는 라우팅 라이브러리입니다.\n\n기본 개념:\n- Route: URL에 따라 렌더링할 컴포넌트 정의\n- Link: 페이지 이동용 컴포넌트\n- useNavigate: 프로그래밍 방식으로 페이지 이동\n\n예:\n<Route path=\"/about\" element={<About />} />\n\n<Link to=\"/about\">About 페이지로 이동</Link>\n\nReact Router를 통해 새로고침 없이도 자연스러운 페이지 이동이 가능하며, 동적 라우팅, 중첩 라우팅 등 다양한 기능도 제공합니다.', 3, 1);
INSERT INTO Post (title, content, category_id, user_id) VALUES
('배포와 storybook', 'React 앱을 배포하는 방법은 다양합니다. 대표적으로 Vercel, Netlify, GitHub Pages, Firebase Hosting 등을 사용할 수 있습니다.\n\n배포 전 빌드:\n```bash\nnpm run build\n```\n\n그 외에도 Storybook을 통해 컴포넌트 단위로 UI를 시각화하고 테스트할 수 있습니다.\n\n설치:\n```bash\nnpx storybook@latest init\n```\n\nStorybook은 디자인 시스템을 구축하거나, UI 변경 사항을 빠르게 리뷰할 수 있게 해주는 도구입니다. 배포는 Chromatic을 통해 자동화할 수 있습니다.', 3, 1),
('Layout, Page, Route, Link', 'Next.js는 파일 기반 라우팅을 사용하며, `pages` 또는 App Router 구조에서는 `app` 디렉토리로 구성됩니다.\n\n✅ 페이지와 라우트:\n- `/pages/about.tsx` → `/about` 라우트 생성\n- 동적 라우트: `/pages/posts/[id].tsx` → `/posts/1`, `/posts/abc`\n\n✅ Link 컴포넌트:\nNext의 `<Link>` 컴포넌트는 클라이언트 측 라우팅을 가능하게 해줍니다.\n```tsx\nimport Link from \'next/link\';\n<Link href="/about">About</Link>\n```\n\n✅ Layout 구성 (App Router 기준):\n`app/layout.tsx` 파일에 공통 레이아웃을 작성하고, 각 `page.tsx`에 개별 화면을 구현합니다.\n```tsx\n// app/layout.tsx\nexport default function RootLayout({ children }) {\n  return (\n    <html>\n      <body>\n        <Header />\n        {children}\n        <Footer />\n      </body>\n    </html>\n  );\n}\n```\n\n이 구조는 유지보수성과 재사용성을 높입니다.', 4, 1),
('CSR, SSR, SSG, ISR', 'Next.js는 다양한 렌더링 방식을 지원하여 상황에 맞는 최적화 전략을 선택할 수 있습니다.\n\n1. CSR (Client Side Rendering)\n   - 컴포넌트가 클라이언트에서 렌더링됨\n   - React의 일반 SPA 방식\n   - 예: useEffect로 데이터 fetch\n\n2. SSR (Server Side Rendering)\n   - 요청 시마다 서버에서 HTML 생성\n   - `getServerSideProps` 사용\n   - SEO와 실시간 데이터에 유리\n\n3. SSG (Static Site Generation)  \n   - 빌드 시 HTML 생성 (정적 파일)\n   - `getStaticProps` 사용\n   - 빠른 로딩, 캐싱 가능\n\n4. ISR (Incremental Static Regeneration)  \n   - SSG + 유효시간 갱신\n   - `revalidate` 옵션으로 정적 파일 재생성\n\n예:\n```ts\nexport const getStaticProps = async () => {\n  const data = await fetch(...);\n  return {\n    props: { data },\n    revalidate: 60, // ISR: 60초마다 갱신\n  };\n}\n```\n\n각 방식은 프로젝트 특성과 SEO/성능 요구에 맞게 선택해야 합니다.', 4, 1),
('Next-Auth', 'NextAuth.js는 Next.js를 위한 인증 솔루션으로, OAuth, Email, Credentials 등 다양한 방식의 인증을 쉽게 구현할 수 있게 해줍니다.\n\n✅ 설치:\n```bash\nnpm install next-auth\n```\n\n✅ 기본 설정:\n- `pages/api/auth/[...nextauth].ts`: API 라우트로 인증 핸들링\n- Provider 설정 예시 (GitHub):\n```ts\nimport NextAuth from \'next-auth\';\nimport GitHubProvider from \'next-auth/providers/github\';\n\nexport default NextAuth({\n  providers: [\n    GitHubProvider({\n      clientId: process.env.GITHUB_ID,\n      clientSecret: process.env.GITHUB_SECRET,\n    }),\n  ],\n});\n```\n\n✅ 클라이언트 사용:\n```tsx\nimport { signIn, signOut, useSession } from \'next-auth/react\';\n\nconst { data: session } = useSession();\n\nreturn session ? (\n  <>\n    <p>Welcome {session.user.name}</p>\n    <button onClick={() => signOut()}>Sign out</button>\n  </>\n) : (\n  <button onClick={() => signIn()}>Sign in</button>\n);\n```\n\nNextAuth는 쿠키 기반 인증을 자동 처리하며, OAuth 연동과 세션 관리도 간편합니다.', 4, 1);


--
-- Table structure for table `Reaction`
--

DROP TABLE IF EXISTS `Reaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reaction` (
  `reaction_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `type` enum('like','dislike') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`reaction_id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `reaction_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`),
  CONSTRAINT `reaction_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `Post` (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reaction`
--

LOCK TABLES `Reaction` WRITE;
/*!40000 ALTER TABLE `Reaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

INSERT INTO User (name, email, password) VALUES
  ('user1', 'user1@example.com', 'password1');

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'hanarodb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-03 13:33:00

OPTIMIZE TABLE Post;
SHOW VARIABLES LIKE 'innodb_ft_min_token_size';