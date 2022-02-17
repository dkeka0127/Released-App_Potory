import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';

function PrivacyPolicy() {
  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.boldText, {fontSize: 16, paddingBottom: 0}]}>
        개인정보 처리방침{'\n'}
      </Text>
      <Text style={styles.lightText}>
        {`Photo in memory (이하 '포토리') 는 개인정보 보호법 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.`}
        {'\n'}
      </Text>

      {/* 제1조 */}
      <Text style={styles.boldText}>{`제1조 개인정보의 처리 목적`}</Text>
      <Text style={styles.lightText}>
        {`포토리는 다음의 목적을 위하여 개인정보를 처리합니다.
처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 별도의 사전 동의를 구할 예정입니다.
1. 회원가입 및 관리
회원 가입의사 확인, 회원자격 유지·관리,서비스 부정이용 방지 목적으로 개인정보를 처리합니다.
2. 재화 또는 서비스 제공
서비스 제공, 콘텐츠 제공을 목적으로 개인정보를 처리합니다.`}
        {'\n'}
      </Text>

      {/* 제2조 */}
      <Text
        style={styles.boldText}>{`제2조 개인정보의 처리 및 보유 기간`}</Text>
      <Text style={styles.lightText}>
        {`① 포토리는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
- 회원가입 및 관리와 관련한 개인정보는 수집·이용에 관한 동의일로부터 회원탈퇴 이전까지 위 이용목적을 위하여 보유·이용됩니다.`}
        {'\n'}
      </Text>

      {/* 제3조 */}
      <Text
        style={
          styles.boldText
        }>{`제3조 정보주체와 법정대리인의 권리·의무 및 그 행사방법`}</Text>
      <Text style={styles.lightText}>
        {`① 정보주체는 포토리에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
② 제1항에 따른 권리 행사는 개인정보 보호법 시행령 제41조제1항에 따라 서면, 전자우편 등을 통하여 하실 수 있으며 포토리는 이에 대해 지체 없이 조치하겠습니다.
③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있으며, 이 경우 개인정보 처리 방법에 관한 고시 제2020-7호의 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
④ 개인정보 열람 및 처리정지 요구는 개인정보 보호법 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.
⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.
⑥ 포토리는 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.`}
        {'\n'}
      </Text>

      {/* 제4조 */}
      <Text
        style={styles.boldText}>{`제4조 처리하는 개인정보의 항목 작성`}</Text>
      <Text style={styles.lightText}>
        {`① 포토리는 다음의 개인정보 항목을 처리하고 있습니다.
- 회원가입 및 관리 : 이메일, 휴대전화번호, 생년월일, 이름`}
        {'\n'}
      </Text>

      {/* 제5조 */}
      <Text style={styles.boldText}>{`제5조 개인정보의 파기`}</Text>
      <Text style={styles.lightText}>
        {`① 포토리는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
② 개인정보 파기의 절차 및 방법은 다음과 같습니다.
- 포토리는 파기 사유가 발생한 개인정보를 선정하고, 포토리의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.`}
        {'\n'}
      </Text>

      {/* 제6조 */}
      <Text style={styles.boldText}>{`제6조 개인정보의 안전성 확보 조치`}</Text>
      <Text style={styles.lightText}>
        {`포토리는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
- 내부관리계획의 수립 및 시행개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.`}
        {'\n'}
      </Text>

      {/* 제7조 */}
      <Text
        style={
          styles.boldText
        }>{`제7조 개인정보 자동 수집 장치의 설치 · 운영 및 거부에 관한 사항`}</Text>
      <Text style={styles.lightText}>
        {`포토리는 정보주체의 이용정보를 저장하고 수시로 불러오는 쿠키를 사용하지 않습니다.`}
        {'\n'}
      </Text>

      {/* 제8조 */}
      <Text style={styles.boldText}>{`제8조 개인정보 보호책임자`}</Text>
      <Text style={styles.lightText}>
        {`① 포토리는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
• 개인정보 보호책임자
• 성명 :최솔
• 직책 :개발자
• 직급 :헤드개발자
• 연락처 : photoinmemory@naver.com
② 정보주체께서는 포토리의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자에게 문의하실 수 있으며, 포토리는 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.`}
        {'\n'}
      </Text>

      {/* 제9조 */}
      <Text style={styles.boldText}>{`제9조 권익침해 구제방법`}</Text>
      <Text style={styles.lightText}>
        {`기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.
개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)`}
        {'\n'}
        {'\n'}
      </Text>

      {/* 제10조 */}
      <Text style={styles.lightText}>
        {`이 개인정보처리방침은 2022년 5월 1부터 적용됩니다.`}
        {'\n'}
        {'\n'}
      </Text>
      <Text style={styles.boldText}>{``}</Text>
    </ScrollView>
  );
}

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  boldText: {
    color: '#111',
    fontSize: 15,
    fontWeight: '600',
    paddingBottom: 3,
  },
  lightText: {
    color: '#111',
    fontSize: 15,
    fontWeight: '400',
  },
});
