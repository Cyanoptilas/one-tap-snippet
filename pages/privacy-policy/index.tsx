import {
  Box,
  Heading,
  Text,
  Link,
  UnorderedList,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";

const PrivacyPolicy = () => {
  return (
    <Box
      p={6}
      maxW="1200px"
      mx="auto"
      bg="gray.50"
      borderRadius="md"
      boxShadow="sm"
      py={8}
      px={10}
    >
      <Heading
        as="h1"
        mb={6}
        color="teal.500"
        borderBottom="2px"
        borderColor="teal.500"
        pb={2}
      >
        ONE-TAP-SNIPPET プライバシーポリシー
      </Heading>

      <Box mb={4} lineHeight="1.6" color="gray.700">
        当サイトは、以下のようにプライバシーポリシーを定め、個人情報保護の重要性の認識と取り組みを行っております。
      </Box>

      <Heading as="h2" size="md" mb={2}>
        第1条（個人情報）
      </Heading>
      <Box mb={4} pl={4}>
        「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし，生存する個人に関する情報であって，当該情報に含まれる氏名，生年月日，住所，電話番号，連絡先その他の記述等により特定の個人を識別できる情報及び容貌，指紋，声紋にかかるデータ，及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。
      </Box>

      <Heading as="h2" size="md" mb={2}>
        第2条（個人情報の収集方法）
      </Heading>
      <Box mb={4} pl={4}>
        当サイトは、ユーザーが利用登録をする際に氏名、メールアドレスなどの個人情報をお尋ねすることがあります。また、ユーザーとの取引に関連して、ユーザーから契約内容や取引内容を収集することがあります。
      </Box>

      <Heading as="h2" size="md" mb={2}>
        第3条（個人情報を収集・利用する目的）
      </Heading>
      <Box mb={4} pl={4}>
        当サイトが個人情報を収集・利用する目的は、以下のとおりです。
        <OrderedList pl={4}>
          <ListItem>当サイトサービスの提供・運営のため</ListItem>
          <ListItem>ユーザーからのお問い合わせに回答するため</ListItem>
          <ListItem>
            ユーザーにご自身の登録情報の閲覧や変更，削除，ご利用状況の閲覧を行っていただくため
          </ListItem>
          <ListItem>その他、上記利用目的に付随する目的のため</ListItem>
        </OrderedList>
      </Box>

      <Heading as="h2" size="md" mb={2}>
        第4条（利用目的の変更）
      </Heading>
      <Box mb={4} pl={4}>
        <OrderedList pl={4}>
          <ListItem>
            当社は，利用目的が変更前と関連性を有すると合理的に認められる場合に限り，個人情報の利用目的を変更するものとします。
          </ListItem>
          <ListItem>
            利用目的の変更を行った場合には，変更後の目的について，当社所定の方法により，ユーザーに通知し，または本ウェブサイト上に公表するものとします。
          </ListItem>
        </OrderedList>
      </Box>

      <Heading as="h2" size="md" mb={2}>
        第5条（個人情報の第三者提供）
      </Heading>
      <Box pl={4}>
        <Box mb={4}>
          当社は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
        </Box>
        <OrderedList mb={4} pl={4}>
          <ListItem>
            人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき
          </ListItem>
          <ListItem>
            公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき
          </ListItem>
          <ListItem>
            国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
          </ListItem>
          <ListItem>
            予め次の事項を告知あるいは公表し、かつ当社が個人情報保護委員会に届出をしたとき
            <UnorderedList pl={4}>
              <ListItem>利用目的に第三者への提供を含むこと</ListItem>
              <ListItem>第三者に提供されるデータの項目</ListItem>
              <ListItem>第三者への提供の手段または方法</ListItem>
              <ListItem>
                本人の求めに応じて個人情報の第三者への提供を停止すること
              </ListItem>
              <ListItem>本人の求めを受け付ける方法</ListItem>
            </UnorderedList>
          </ListItem>
        </OrderedList>
        <Box mb={4}>
          前項の定めにかかわらず、次に掲げる場合には、当該情報の提供先は第三者に該当しないものとします。
        </Box>
        <OrderedList mb={4} pl={4}>
          <ListItem>
            当社が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合
          </ListItem>
          <ListItem>
            合併その他の事由による事業の承継に伴って個人情報が提供される場合
          </ListItem>
          <ListItem>
            個人情報を特定の者との間で共同して利用する場合であって、その旨並びに共同して利用される個人情報の項目、共同して利用する者の範囲、利用する者の利用目的および当該個人情報の管理について責任を有する者の氏名または名称について、あらかじめ本人に通知し、または本人が容易に知り得る状態に置いた場合
          </ListItem>
        </OrderedList>
      </Box>

      <Heading as="h2" size="md" mb={2}>
        第6条（個人情報の開示）
      </Heading>
      <Box mb={4}>
        <OrderedList mb={4} pl={4}>
          <ListItem>
            当サイトは、ユーザーからの個人情報の開示要求があった場合、ユーザーに対して遅滞なく開示を行います（ただし、当サイトが該当する個人情報を保有していない場合は、その旨を通知します）。しかし、以下のいずれかに該当する場合は、その全部または一部を開示しないことがあります。
          </ListItem>
          <UnorderedList pl={4}>
            <ListItem>
              ユーザーまたは第三者の生命、身体、財産その他の権利利益を害する恐れがある場合
            </ListItem>
            <ListItem>
              当サイトの業務の適正な実施を妨げる恐れがある場合
            </ListItem>
            <ListItem>その他法令に違反することとなる場合</ListItem>
          </UnorderedList>
          <ListItem>
            前項の定めにかかわらず，履歴情報および特性情報などの個人情報以外の情報については，原則として開示いたしません。
          </ListItem>
        </OrderedList>
      </Box>

      <Heading as="h2" size="md" mb={2}>
        第7条（個人情報の訂正および削除）
      </Heading>
      <Box mb={4}>
        <OrderedList mb={4} pl={4}>
          <ListItem>
            ユーザーは，当社の保有する自己の個人情報が誤った情報である場合には，当社が定める手続きにより，当社に対して個人情報の訂正，追加または削除（以下，「訂正等」といいます。）を請求することができます。
          </ListItem>
          <ListItem>
            当社は，ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の訂正等を行うものとします。
          </ListItem>
          <ListItem>
            当社は，前項の規定に基づき訂正等を行った場合，または訂正等を行わない旨の決定をしたときは遅滞なく，これをユーザーに通知します。
          </ListItem>
        </OrderedList>
      </Box>

      {/* <Heading as="h2" size="md" mb={2}>
        第8条（アクセス分析ツールの利用について）
      </Heading>
      <Box mb={4} pl={4}>
        当サイトでは、サイト利用状況の把握のためにGoogle
        Analyticsを利用しております。Google
        Analyticsはトラフィックデータの収集のためにCookieを使用しています。データは匿名で収集されており、個人を特定するものではありません。この機能はブラウザの設定でCookieを無効にすることで拒否することができます。詳細は下記のポリシーをご参照ください。
        <Link
          href="https://policies.google.com/technologies/partner-sites"
          isExternal
          color="blue.500"
        >
          Googleのポリシー
        </Link>
      </Box> */}

      <Heading as="h2" size="md" mb={2}>
        第8条（個人情報の利用停止等）
      </Heading>
      <Box mb={4} pl={4}>
        <OrderedList mb={4} pl={4}>
          <ListItem>
            当社は，本人から，個人情報が，利用目的の範囲を超えて取り扱われているという理由，または不正の手段により取得されたものであるという理由により，その利用の停止または消去（以下，「利用停止等」といいます。）を求められた場合には，遅滞なく必要な調査を行います。
          </ListItem>
          <ListItem>
            前項の調査結果に基づき，その請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の利用停止等を行います。
          </ListItem>
          <ListItem>
            当社は，前項の規定に基づき利用停止等を行った場合，または利用停止等を行わない旨の決定をしたときは，遅滞なく，これをユーザーに通知します。
          </ListItem>
          <ListItem>
            前2項にかかわらず，利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合であって，ユーザーの権利利益を保護するために必要なこれに代わるべき措置をとれる場合は，この代替策を講じるものとします。
          </ListItem>
        </OrderedList>
      </Box>

      <Heading as="h2" size="md" mb={2}>
        第9条（プライバシーポリシーの変更）
      </Heading>
      <Box mb={4} pl={4}>
        <OrderedList mb={4} pl={4}>
          <ListItem>
            本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，ユーザーに通知することなく，変更することができるものとします。
          </ListItem>
          <ListItem>
            当社が別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。{" "}
          </ListItem>
        </OrderedList>
      </Box>

      <Heading as="h2" size="md" mb={2}>
        第10条（お問い合わせ）
      </Heading>
      <Box mb={4} pl={4}>
        本ポリシーに関するお問い合わせは、下記の窓口までご連絡ください。
        <br />
        <Link href="/contactme" color="blue">
          問い合わせフォーム
        </Link>
      </Box>
    </Box>
  );
};

export default PrivacyPolicy;
